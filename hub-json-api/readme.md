# Header
Content-Type: application/vnd.api+json

# Sample of the REST API PATCH body, for POST just don't provide "id"
{
  "data":
  	{
  		"type": "comments",
  		"id": "aaaa9899-3b40-41a3-8b4d-27b5025ab3a3",
  		"attributes": {
  			"title": "My First Comment",
  			"url": "http://localhost/asdf/poof",
  			"height": 48,
  			"width": 48
  		}
  	}
}

# Sample of GET
Using the above example:

http://localhost:4001/api/comments/aaaa9899-3b40-41a3-8b4d-27b5025ab3a3

# GraphQL GUI
Located at http://localhost:4001/api/ (last slash is important evidently)

# Connection Info
That is defined in the handler, I think you could have just 1, but I copied it for some reason.

## Pulls a list of comments with specific attributes

{
  comments {
    id
    title
    url
    height
    width
    created
  }
}

## Pulls a specific id
{
  comments(id: "aaaa9899-3b40-41a3-8b4d-27b5025ab3a3") {
    id
    title
    url
    height
    width
    created
  }
}

# Pulls by attribute value
{
  comments(width: "48") {
    id
    title
    url
    height
    width
    created
  }
}
