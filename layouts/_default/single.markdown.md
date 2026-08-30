# {{ .Title }}

{{ with .Description }}> {{ . }}
{{ end }}
{{ if eq .Section "writing" }}Published: {{ .Date.Format "2006-01-02" }}
{{ with .Params.tags }}Tags: {{ delimit . ", " }}
{{ end }}{{ else if eq .Section "projects" }}Year: {{ .Params.year }} · Role: {{ .Params.role }}
{{ with .Params.tags }}Tags: {{ delimit . ", " }}
{{ end }}{{ end }}
Source: {{ .Permalink }}

{{ .RawContent }}
