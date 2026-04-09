use crate::models::PointRecord;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Copy)]
enum DataMode {
    Ascii,
    Binary,
}

#[derive(Debug, Clone)]
struct ParsedHeader {
    fields: Vec<String>,
    sizes: Vec<usize>,
    types: Vec<String>,
    counts: Vec<usize>,
    points: usize,
    data_mode: DataMode,
    data_offset: usize,
}

pub fn load_points_from_pcd(
    path: &Path,
    max_points: Option<usize>,
    view_range: Option<&[f32]>,
) -> Result<Vec<PointRecord>, String> {
    let bytes =
        fs::read(path).map_err(|err| format!("failed to read {}: {err}", path.display()))?;
    let header = parse_header(&bytes)?;
    let mut points = match header.data_mode {
        DataMode::Ascii => parse_ascii_points(&bytes[header.data_offset..], &header)?,
        DataMode::Binary => parse_binary_points(&bytes[header.data_offset..], &header)?,
    };

    if let Some([xmin, ymin, zmin, xmax, ymax, zmax]) = parse_view_range(view_range) {
        points.retain(|point| {
            point.x >= xmin
                && point.x <= xmax
                && point.y >= ymin
                && point.y <= ymax
                && point.z >= zmin
                && point.z <= zmax
        });
    }

    if let Some(limit) = max_points {
        if points.len() > limit && limit > 0 {
            let stride = (points.len() as f32 / limit as f32).ceil() as usize;
            points = points.into_iter().step_by(stride.max(1)).collect();
        }
    }

    Ok(points)
}

fn parse_view_range(view_range: Option<&[f32]>) -> Option<[f32; 6]> {
    let values = view_range?;
    if values.len() != 6 {
        return None;
    }
    Some([
        values[0], values[1], values[2], values[3], values[4], values[5],
    ])
}

fn parse_header(bytes: &[u8]) -> Result<ParsedHeader, String> {
    let marker = b"DATA ";
    let marker_index = bytes
        .windows(marker.len())
        .position(|window| window == marker)
        .ok_or_else(|| "invalid pcd: missing DATA header".to_string())?;

    let header_end_rel = bytes[marker_index..]
        .iter()
        .position(|b| *b == b'\n')
        .ok_or_else(|| "invalid pcd: DATA line not terminated".to_string())?;
    let header_end = marker_index + header_end_rel + 1;
    let header_text = std::str::from_utf8(&bytes[..header_end])
        .map_err(|err| format!("invalid pcd header utf8: {err}"))?;

    let mut entries: HashMap<String, String> = HashMap::new();
    for raw_line in header_text.lines() {
        let line = raw_line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let mut parts = line.split_whitespace();
        if let Some(key) = parts.next() {
            entries.insert(key.to_uppercase(), parts.collect::<Vec<_>>().join(" "));
        }
    }

    let fields = split_usize_or_string(&entries, "FIELDS")?;
    let sizes = split_usize(&entries, "SIZE")?;
    let types = split_usize_or_string(&entries, "TYPE")?;
    let counts = match entries.get("COUNT") {
        Some(_) => split_usize(&entries, "COUNT")?,
        None => vec![1; fields.len()],
    };

    if fields.len() != sizes.len() || fields.len() != types.len() || fields.len() != counts.len() {
        return Err("invalid pcd: FIELDS/SIZE/TYPE/COUNT length mismatch".to_string());
    }

    let points = entries
        .get("POINTS")
        .ok_or_else(|| "invalid pcd: missing POINTS".to_string())?
        .parse::<usize>()
        .map_err(|err| format!("invalid pcd POINTS: {err}"))?;

    let data_mode = match entries
        .get("DATA")
        .ok_or_else(|| "invalid pcd: missing DATA".to_string())?
        .trim()
        .to_lowercase()
        .as_str()
    {
        "ascii" => DataMode::Ascii,
        "binary" => DataMode::Binary,
        other => return Err(format!("unsupported pcd DATA mode: {other}")),
    };

    Ok(ParsedHeader {
        fields,
        sizes,
        types,
        counts,
        points,
        data_mode,
        data_offset: header_end,
    })
}

fn split_usize(entries: &HashMap<String, String>, key: &str) -> Result<Vec<usize>, String> {
    entries
        .get(key)
        .ok_or_else(|| format!("invalid pcd: missing {key}"))?
        .split_whitespace()
        .map(|item| {
            item.parse::<usize>()
                .map_err(|err| format!("invalid {key}: {err}"))
        })
        .collect()
}

fn split_usize_or_string(
    entries: &HashMap<String, String>,
    key: &str,
) -> Result<Vec<String>, String> {
    Ok(entries
        .get(key)
        .ok_or_else(|| format!("invalid pcd: missing {key}"))?
        .split_whitespace()
        .map(ToString::to_string)
        .collect())
}

fn parse_ascii_points(data: &[u8], header: &ParsedHeader) -> Result<Vec<PointRecord>, String> {
    let text = std::str::from_utf8(data).map_err(|err| format!("invalid ascii pcd data: {err}"))?;
    let scalar_count: usize = header.counts.iter().sum();

    let field_offsets = scalar_offsets(header);
    let x_index = field_offsets
        .get("x")
        .copied()
        .ok_or_else(|| "pcd missing x field".to_string())?;
    let y_index = field_offsets
        .get("y")
        .copied()
        .ok_or_else(|| "pcd missing y field".to_string())?;
    let z_index = field_offsets
        .get("z")
        .copied()
        .ok_or_else(|| "pcd missing z field".to_string())?;
    let intensity_index = field_offsets.get("intensity").copied();

    let values: Result<Vec<f32>, _> = text
        .split_whitespace()
        .map(|item| item.parse::<f32>())
        .collect();
    let values = values.map_err(|err| format!("invalid ascii pcd scalar: {err}"))?;

    if values.len() < header.points * scalar_count {
        return Err("invalid ascii pcd: not enough scalar values".to_string());
    }

    let mut points = Vec::with_capacity(header.points);
    for idx in 0..header.points {
        let base = idx * scalar_count;
        points.push(PointRecord {
            x: values[base + x_index],
            y: values[base + y_index],
            z: values[base + z_index],
            intensity: intensity_index
                .map(|offset| values[base + offset])
                .unwrap_or(0.0),
        });
    }

    Ok(points)
}

fn parse_binary_points(data: &[u8], header: &ParsedHeader) -> Result<Vec<PointRecord>, String> {
    let mut byte_offsets = HashMap::new();
    let mut cursor = 0usize;
    for ((field, size), count) in header
        .fields
        .iter()
        .zip(header.sizes.iter())
        .zip(header.counts.iter())
    {
        byte_offsets.insert(field.to_lowercase(), (cursor, *size, *count));
        cursor += size * count;
    }
    let point_step = cursor;
    let expected = point_step * header.points;
    if data.len() < expected {
        return Err("invalid binary pcd: data payload too small".to_string());
    }

    let x_def = byte_offsets
        .get("x")
        .ok_or_else(|| "pcd missing x field".to_string())?;
    let y_def = byte_offsets
        .get("y")
        .ok_or_else(|| "pcd missing y field".to_string())?;
    let z_def = byte_offsets
        .get("z")
        .ok_or_else(|| "pcd missing z field".to_string())?;
    let intensity_def = byte_offsets.get("intensity");

    let mut points = Vec::with_capacity(header.points);
    for idx in 0..header.points {
        let base = idx * point_step;
        points.push(PointRecord {
            x: read_scalar(
                &data[base + x_def.0..base + x_def.0 + x_def.1],
                &header.types[find_field_index(&header.fields, "x")?],
                x_def.1,
            )?,
            y: read_scalar(
                &data[base + y_def.0..base + y_def.0 + y_def.1],
                &header.types[find_field_index(&header.fields, "y")?],
                y_def.1,
            )?,
            z: read_scalar(
                &data[base + z_def.0..base + z_def.0 + z_def.1],
                &header.types[find_field_index(&header.fields, "z")?],
                z_def.1,
            )?,
            intensity: match intensity_def {
                Some(def) => {
                    let field_index = find_field_index(&header.fields, "intensity")?;
                    read_scalar(
                        &data[base + def.0..base + def.0 + def.1],
                        &header.types[field_index],
                        def.1,
                    )?
                }
                None => 0.0,
            },
        });
    }

    Ok(points)
}

fn scalar_offsets(header: &ParsedHeader) -> HashMap<String, usize> {
    let mut offsets = HashMap::new();
    let mut cursor = 0usize;
    for (field, count) in header.fields.iter().zip(header.counts.iter()) {
        offsets.insert(field.to_lowercase(), cursor);
        cursor += count;
    }
    offsets
}

fn find_field_index(fields: &[String], target: &str) -> Result<usize, String> {
    fields
        .iter()
        .position(|field| field.eq_ignore_ascii_case(target))
        .ok_or_else(|| format!("pcd missing {target} field"))
}

fn read_scalar(bytes: &[u8], field_type: &str, size: usize) -> Result<f32, String> {
    let normalized = field_type.to_ascii_uppercase();
    match (normalized.as_str(), size) {
        ("F", 4) => Ok(f32::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid f32 field".to_string())?,
        )),
        ("F", 8) => Ok(f64::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid f64 field".to_string())?,
        ) as f32),
        ("U", 1) => Ok(bytes[0] as f32),
        ("U", 2) => Ok(u16::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid u16 field".to_string())?,
        ) as f32),
        ("U", 4) => Ok(u32::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid u32 field".to_string())?,
        ) as f32),
        ("I", 1) => Ok(i8::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid i8 field".to_string())?,
        ) as f32),
        ("I", 2) => Ok(i16::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid i16 field".to_string())?,
        ) as f32),
        ("I", 4) => Ok(i32::from_le_bytes(
            bytes
                .try_into()
                .map_err(|_| "invalid i32 field".to_string())?,
        ) as f32),
        _ => Err(format!("unsupported pcd scalar type {normalized}{size}")),
    }
}
