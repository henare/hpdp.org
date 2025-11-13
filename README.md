# HPDP Website

The official website for Harold Park District Players (HPDP), a community theatre group in Glebe, Sydney.

## Overview

This Jekyll-based site includes:
- Main HPDP website content
- Blog posts and news articles
- Production results (integrated from stats.hpdp.org.au)

## Quick Start

### Local Development

Build and serve the site locally using Docker:

```bash
# Build the site
docker compose run --rm jekyll bundle exec jekyll build

# Serve locally with live reload
docker compose up
```

The site will be available at http://localhost:4000

### Install Dependencies

If you need to update gems:

```bash
docker compose run --rm jekyll bundle install
docker compose run --rm jekyll bundle update
```

## Site Structure

```
hpdp.org.au/
├── _posts/           # Blog posts
├── results/          # Production results content
│   ├── 2002/
│   ├── 2003/
│   └── ...          # Year-by-year results
├── _data/            # CSV data files for results
│   ├── venues.csv
│   ├── directors.csv
│   ├── presidents.csv
│   └── ...
├── _includes/        # Reusable components
│   └── results/     # Results-specific includes
├── _layouts/         # Page templates
├── assets/           # CSS, JS, images
│   └── results/     # Results-specific assets
└── _config.yml       # Jekyll configuration
```

## Results Integration

The production results from stats.hpdp.org.au are now integrated under `/results/`.

### Viewing Results

- Main results page: `/results/`
- Year-specific results: `/results/YYYY/` (e.g., `/results/2023/`)
- Production details: `/results/YYYY/production-name/`

### Adding New Results Data

1. Add or update CSV files in the `_data/` directory:
   - `productions.csv` - Main production data
   - `venues.csv` - Venue information
   - `directors.csv` - Director profiles
   - `presidents.csv` - Historical presidents
   - `patrons.csv` - Patron information

2. CSV files should follow the existing format with headers matching the current structure

3. Run Jekyll build to regenerate the results pages

### Results Features

- Sortable tables (click column headers)
- Responsive design for mobile viewing
- Year-by-year production listings
- Director, venue, and production type filtering
- Search functionality on results pages

## Configuration

Main configuration is in `_config.yml`:

```yaml
title: Harold Park District Players
description: A community theatre group based in Glebe, Sydney
url: "https://hpdp.org.au"
baseurl: ""
```

## Deployment

The site is a static Jekyll site that can be deployed to any static hosting:

1. Build the site: `docker compose run --rm jekyll bundle exec jekyll build`
2. Deploy the `_site/` directory to your hosting provider
3. Ensure all assets are served with correct MIME types

## Blog Posts

Add new blog posts to `_posts/` following the naming convention:

```
YYYY-MM-DD-title-of-post.html
```

Posts should include front matter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +1000
categories: news
---
```

## Maintenance

### Updating Jekyll or Dependencies

```bash
# Update all gems
docker compose run --rm jekyll bundle update

# Update specific gem
docker compose run --rm jekyll bundle update jekyll
```

### Troubleshooting Build Issues

If the build fails:

1. Check Jekyll version compatibility in `Gemfile`
2. Verify all CSV data files are properly formatted
3. Check for liquid template syntax errors in layouts
4. Review build output for specific error messages

## Technical Details

- Jekyll version: 4.0+
- Ruby version: 2.7+
- Key dependencies: jekyll-feed, jekyll-paginate
- Results integration maintains original functionality from stats.hpdp.org.au

## History

The results section was integrated from a separate stats.hpdp.org.au repository in 2025, preserving all historical production data while maintaining the original site's blog and content structure.

## License

Content and code belong to Harold Park District Players.
