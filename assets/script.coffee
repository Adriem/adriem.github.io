---
---
$ ->

  # ---[ ANCHOR LINKS ]--- #

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

  $('a:not([href*="#"])').click ->
    $('body').addClass('fading')
    setTimeout (=> window.location.href = @href), 300
    return false


  # ---[ SCROLL SPY ]--- #

  BRAND_OFFSET_VH = 45

  $navbar = $('.navbar')

  navbarExpanded = true

  getScrollPosition = ->
    document.documentElement.scrollTop or document.body.scrollTop

  getWindowHeight = ->
    Math.max(document.documentElement.clientHeight, window.innerHeight or 0)

  expandNavbar = ->
    navbarExpanded = true
    $navbar.removeClass('navbar--collapsed')
    $navbar.addClass('navbar--expanded')

  collapseNavbar = ->
    navbarExpanded = false
    $navbar.removeClass('navbar--expanded')
    $navbar.addClass('navbar--collapsed')

  transformNavbar = ->
    scrollPosition = getScrollPosition()
    windowHeight = getWindowHeight()

    if navbarExpanded and scrollPosition > 100
      collapseNavbar()
    else if not navbarExpanded and scrollPosition <= 50
      expandNavbar()

  # ---[ PARALLAX SCROLL ]--- #

  $bg = $('.parallax__bg')

  updatePosition = ->
    scrollPosition = getScrollPosition()
    bgPosition = scrollPosition / 2
    $bg.css('transform', "translateY(#{bgPosition}px)") if scrollPosition < $bg.height()

  window.onscroll = () -> transformNavbar() ; updatePosition()
  window.onresize = transformNavbar
