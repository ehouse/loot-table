#!/bin/bash

### Generate equipment list
jq '.hits.hits
| map(._source)
| map({
    id,
    name,
    url,
    source: .source[0],
    source_category,
    level,
    rarity,
    bulk,
    price,
    traits: .trait_markdown
        | split(", ")
        | map(capture("\\[(?<name>.+)\\]\\((?<href>.+)\\)")),
    type,
    item_category,
    item_subcategory
})' equipment_raw.json > equipment.json
