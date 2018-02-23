local directory_name = "%%template"
local file_name = "%%template"

local main_script_path = "scripts/mods/" .. directory_name .. "/" ..file_name

print("[LOADING MOD] " .. file_name)

local ret = {
	run = function()
		local mod = new_mod(file_name)
		mod:localization("localization/" .. file_name)
		mod:dofile(main_script_path)
	end,
	packages = {
		"resource_packages/" .. directory_name.. "/" .. file_name
	},
}
return ret