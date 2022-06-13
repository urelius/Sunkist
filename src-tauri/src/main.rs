#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use std::path::PathBuf;

fn main() {
  // print active profile

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_profile_paths, switch_profile, get_active_profile, create_profile])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_profile_paths() -> Option<Vec<PathBuf>>{
  let profile_dir = tauri::api::path::data_dir().unwrap();
  let profile_path = profile_dir.as_path();
  Some(fs::read_dir(profile_path).ok()?
      .filter_map(|entry| {
          Some(
              entry
                  .ok()?
                  .path()
                  .strip_prefix(profile_path)
                  .ok()?
                  .to_path_buf(),
          )
      })
      .filter(|path| path.to_str().unwrap().contains("Sunkist"))
      .collect())

}

// Save current profile back to source via file named profile
// Copy new profile into profile 

#[tauri::command]
fn switch_profile(profile_name: &str) {
  let profile_dir = tauri::api::path::data_dir().unwrap();
  let root_package_path : String = "com.github.axfan.sunkist".to_owned();
  let sunkist_package_path : String = "Sunkist#".to_owned();
  let profile_package_path = sunkist_package_path.clone() + profile_name;
  let active_profile = get_active_profile().unwrap();
  let active_profile_path = sunkist_package_path.clone() + &active_profile;
  let copy_options = fs_extra::dir::CopyOptions {
    overwrite: true,
    content_only: true,
    copy_inside: true,
    ..Default::default()
  };

  if !active_profile_path.is_empty() {
    fs_extra::dir::copy(
      profile_dir.as_path().join(root_package_path.clone()),
      profile_dir.as_path().join(active_profile_path.clone()),
      &copy_options
    );
  }
  
  fs_extra::dir::create(profile_dir.as_path().join(root_package_path.clone()), true).ok();
  fs_extra::dir::copy(
    profile_dir.as_path().join(profile_package_path.clone()),
    profile_dir.as_path().join(root_package_path.clone()),
    &copy_options
  ).ok();

}

#[tauri::command]
fn get_active_profile() -> Option<String> {
  let profile_dir = tauri::api::path::data_dir().unwrap();
  let root_package_path : String = "com.github.axfan.sunkist".to_owned();

  fs_extra::dir::create(profile_dir.as_path().join(root_package_path.clone()), false).ok();
    
  let active_profilles:Option<Vec<PathBuf>> = Some(fs::read_dir( profile_dir.as_path().join(root_package_path.clone())).ok()?
    .filter_map(|entry| {
        Some(
            entry
                .ok()?
                .path()
                .strip_prefix(profile_dir.as_path())
                .ok()?
                .to_path_buf(),
        )
    })
    .filter(|path| path.to_str().unwrap().contains("Profile"))
    .collect());

  if active_profilles.as_ref().unwrap().is_empty() {
    return Some("".to_string());
  }
  return Some(active_profilles.unwrap()[0].to_str().unwrap().to_string().split("#").collect::<Vec<&str>>()[1].to_string());
}

// Save profile to run when user switches profiles on UI
// Push current profile to Sunkist#ProfileName
#[tauri::command]
fn create_profile(profile_name: &str) {
  let profile_dir = tauri::api::path::data_dir().unwrap();
  let root_package_path : String = "com.github.axfan.sunkist".to_owned();
  let sunkist_package_path : String = "Sunkist#".to_owned();
  let profile_package_path = sunkist_package_path.clone() + profile_name;

  fs_extra::dir::create(profile_dir.as_path().join(profile_package_path.clone()), false).ok();
  fs_extra::file::write_all(profile_dir.as_path().join(profile_package_path.clone()).join("Profile#".to_owned() + profile_name), profile_name.clone()).ok();
}