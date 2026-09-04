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
  local title_size=${6:-64}
  local work_dir
  work_dir=$(mktemp -d)

  convert -size 1200x630 "xc:#141817" \
    -fill "$accent" -draw "rectangle 0,0 18,630" \
    -fill "#1d2321" -draw "roundrectangle 760,64 1136,566 22,22" \
    -fill "#3a4540" -stroke "#3a4540" -draw "line 80,548 700,548" \
    "$work_dir/base.png"

  convert -background none -fill "#72cfc7" -font DejaVu-Sans-Bold -pointsize 24 \
    -size 620x50 "caption:${eyebrow^^}" "$work_dir/eyebrow.png"
  convert -background none -fill "#f4f1ea" -font DejaVu-Serif -pointsize "$title_size" \
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
make_card "runbook-relay.png" "Project case study" "Runbook Relay" "Durable server policy, scoped approval, replay protection, and receipts."
make_card "mistral-reliability-lab.png" "Project case study" "Agent Reliability Lab" "Bounded tools, deterministic evaluations, and privacy-first telemetry."
make_card "safe-model-failover.png" "Project" "Safe Model Failover Learning Lab" "Bounded retries, policy-safe fallback, and circuit breaking."
make_card "7dayfocus.png" "Project" "7DayFocus AI Delivery Lab" "A public reference with proposal-only AI assistance."
make_card "agentic-ai-after-demo.png" "Article" "The Hard Part Starts After the Demo" "A production architecture for agentic AI."
make_card "context-and-control.png" "Article" "Why Enterprise AI Agents Need Separate Context and Control Layers" "Better information does not replace execution boundaries." "#45aaa2" "46"
make_card "agent-control-plane.png" "Article" "When AI Agents Become Cyber-Capable" "The control plane must sit outside the model." "#45aaa2" "52"
make_card "governed-tools.png" "Article" "When AI Agents Need Governed Tools, Not Just Screenshots" "What WebMCP changes about high-consequence interfaces." "#45aaa2" "50"
make_card "ontology-context.png" "Article" "When AI Agents Need an Ontology, Not Just More Context" "How shared meaning becomes an operational boundary." "#45aaa2" "50"
make_card "agent-skill-library.png" "Article" "8 Rules for Running an AI Agent Skill Library" "How to keep agent skills maintainable, routable, and trustworthy."
make_card "builder-sandboxes.png" "Article" "Try AWS Builder Center Sandbox Workshops Without an AWS Account" "Free, pre-provisioned environments remove account and payment setup." "#45aaa2" "46"
make_card "ai-native-delivery-methods.png" "Article" "Three AI Delivery Methods for Three Different Failure Modes" "Choose the method by the failure it prevents." "#45aaa2" "50"
make_card "screen-use-vs-webmcp.png" "Article" "Screen Use vs WebMCP" "What changes when an agent gets governed tools."
make_card "browser-tool-governed-workflow.png" "Article" "Why Browser Agent Governance Belongs on the Server" "Move policy, approval, replay protection, and evidence to the server boundary." "#45aaa2" "52"
make_card "model-failover-policy.png" "Article" "Model Failover Is a Policy Decision" "Retry, switch, degrade, or stop inside an explicit boundary."
make_card "hidden-token-tax.png" "Article" "The Cheapest AI Model Is Not Always the Cheapest System" "Measure cost per verified outcome, not cost per token." "#45aaa2" "50"
make_card "reviewing-ai-built-work.png" "Article" "Review AI-Built Work Without Outsourcing Judgment" "Evidence informs. The human owner decides what ships."
make_card "skill-routing-reliability.png" "Article" "Skill Routing Is a Reliability Problem" "Test positive, negative, overlap, and stale routes."

identify "$output_dir"/*.png
