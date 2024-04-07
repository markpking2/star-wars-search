# DynamoDB Schema for SWAPI People and Films

This document outlines the DynamoDB schema design for a project that models the Star Wars API (SWAPI) people and films data.

## Table Structure
### Table Name
- `SWAPI_People_Films`
### Primary Key
- `PK` (Partition Key): e.g. `people#1` or `film#1`
### Sort Key
- No sort key was chosen due to the simplicity of the data model, decreasing cost and increasing performance.
### Attributes
#### Shared Attributes
- pk: `S` (String) - Partition Key; composite key that includes entity type and ID.
- date_created: `S` (String) - Date and time the item was created.
- date_updated: `S` (String) - Date and time the item was last updated.
### People Attributes
- name: `S` (String) - Name of the person.
- birth_year: `S` (String) - Birth year of person
- eye_color: `S` (String) - Eye color of person
- gender: `S` (String) - Gender of person
- hair_color: `S` (String) - Hair color of person
- height: `N` (Number) - Height of person in centimeters
- mass: `N` (Number) - Mass of person in kilograms
- skin_color: `S` (String) - Skin color of person
- films: `SS` (String Set) - Set of film IDs the person appears in
### Films Attributes
- title: `S` (String) - Title of the film
- episode_id: `N` (Number) - Episode ID of the film
- opening_crawl: `S` (String) - Opening crawl text of the film
- director: `S` (String) - Director of the film
- producer: `S` (String) - Producer of the film
- release_date: `S` (String) - Release date of the film
- characters: `SS` (String Set) - Set of character IDs in the film

## Design Considerations
### Single Table Design
- Efficiency - By storing both films and people in the same table, we can reduce the number of requests needed to fetch related data, lowering latency and improving performance.
- Scalability: Single table design allows for easy scaling as all related entities are stored together. This is beneficial for applications that frequently access the related data.
- Cost: Single table design can reduce costs
