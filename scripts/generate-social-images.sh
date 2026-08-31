#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "$0")/.." && pwd)
output_dir="$repo_root/static/images/social"
mkdir -p "$output_dir"

make_card() {
  local filename=$1
  local eyebrow=$2
  local title=$3
  local subtitle=$4
  local accent=${5:-#45aaa2}
  local work_dir
  work_dir=$(mktemp -d)

  convert -size 1200x630 "xc:#141817" \
    -fill "$accent" -draw "rectangle 0,0 18,630" \
    -fill "#1d2321" -draw "roundrectangle 760,64 1136,566 22,22" \
    -fill "#3a4540" -stroke "#3a4540" -draw "line 80,548 700,548" \
    "$work_dir/base.png"

  convert -background none -fill "#72cfc7" -font DejaVu-Sans-Bold -pointsize 24 \
    -size 620x50 "caption:${eyebrow^^}" "$work_dir/eyebrow.png"
  convert -background none -fill "#f4f1ea" -font DejaVu-Serif -pointsize 64 \
    -size 650x280 "caption:$title" "$work_dir/title.png"
  convert -background none -fill "#aab3ae" -font DejaVu-Sans -pointsize 25 \
    -size 620x105 "caption:$subtitle" "$work_dir/subtitle.png"
  convert -background none -fill "#f4f1ea" -font DejaVu-Sans-Bold -pointsize 66 \
    -size 300x120 -gravity center "caption:AN" "$work_dir/mark.png"

  convert "$work_dir/base.png" \
    "$work_dir/eyebrow.png" -geometry +80+76 -composite \
    "$work_dir/title.png" -geometry +80+150 -composite \
    "$work_dir/subtitle.png" -geometry +80+420 -composite \
    "$work_dir/mark.png" -geometry +800+185 -composite \
    -fill "#72cfc7" -font DejaVu-Sans-Bold -pointsize 22 -annotate +828+382 "ANDREAS NISSEN" \
    -fill "#aab3ae" -font DejaVu-Sans -pointsize 19 -annotate +837+420 "andreasnissen.dev" \
    -depth 8 \
    -strip \
    "$output_dir/$filename"

  rm -r "$work_dir"
}

make_card "default.png" "Enterprise AI" "Reliable systems, inspectable evidence" "Architecture, evaluation, policy controls, and governed execution."
make_card "about.png" "About" "Andreas Nissen" "Senior Solutions Architect focused on reliable enterprise AI."
make_card "selected-impact.png" "Selected impact" "Outcomes, with the boundary visible" "Public systems, enterprise AI delivery, and technical workshops." "#ff9d3d"
make_card "talks.png" "Talks and workshops" "Make the architecture discussable" "Evaluation, policy controls, and reliable enterprise agents." "#ff9d3d"
make_card "reliable-agents-workshop.png" "Workshop" "Reliable Agents in Production" "From a convincing prototype to an operable system." "#ff9d3d"
make_card "runbook-relay.png" "Project case study" "Runbook Relay" "Governed WebMCP tools, human approval, and visible receipts."
make_card "mistral-reliability-lab.png" "Project case study" "Mistral Reliability Lab" "Bounded tools, deterministic evaluations, and privacy-first telemetry."
make_card "safe-model-failover.png" "Project" "Safe Model Failover Learning Lab" "Bounded retries, policy-safe fallback, and circuit breaking."
make_card "7dayfocus.png" "Project" "7DayFocus AI Delivery Lab" "A public reference with proposal-only AI assistance."
make_card "agentic-ai-after-demo.png" "Article" "The Hard Part Starts After the Demo" "A production architecture for agentic AI."
make_card "context-and-control.png" "Article" "Context and Control Are Different Layers" "Why better information does not replace execution boundaries."
make_card "governed-tools.png" "Article" "From Screenshots to Governed Tools" "What WebMCP changes about agent-facing interfaces."
make_card "ontology-context.png" "Article" "Ontology Is More Than Context" "How shared meaning becomes an operational boundary."
make_card "agent-skill-library.png" "Article" "8 Rules for Running an AI Agent Skill Library" "How to keep agent skills maintainable, routable, and trustworthy."
make_card "builder-sandboxes.png" "Article" "Free AWS Builder Center Sandboxes" "A practical path into hands-on agentic AI learning."
make_card "ai-native-delivery-methods.png" "Article" "Three AI-Native Delivery Methods" "Anthropic artifacts, AWS governance, and OpenAI harness engineering."

identify "$output_dir"/*.png
