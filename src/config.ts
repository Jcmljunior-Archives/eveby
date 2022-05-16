declare type ConfigMode = "prod" | "dev"

declare type ConfigOptions = {
  mode: ConfigMode,
  debug: boolean,
  plugins?: []
}

export const EvebyConfig: ConfigOptions = {
  mode: "dev",
  debug: true
}
