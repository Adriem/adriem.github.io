---
---
$ ->

  # If url contains an anchor, smooth scroll to it
  if location.hash isnt ""
    hash = location.hash
    location.hash = ""
    setTimeout ->
      target = $(hash)
      target = if target.length then target else $("[name=#{hash.slice(1)}]")
      if target.length
        $('html, body').animate(scrollTop: target.offset().top, 500)
        # location.hash = hash # Restore location hash after smooth scrolling
    , 100

  # Add smooth scroll to '#anchor' links
  $('a[href*="#"]:not([href="#"])').click ->
    if location.pathname.replace(/^\//,'') == @pathname.replace(/^\//, '') and
        location.hostname == @hostname
      target = $(@hash)
      target = if target.length then target else $("[name=#{@hash.slice(1)}]")
      if target.length
        $('html, body').animate(scrollTop: target.offset().top, 500)
        return false
