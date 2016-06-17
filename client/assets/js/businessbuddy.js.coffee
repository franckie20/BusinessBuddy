# $ ->
#   $(".nicescroll").niceScroll(cursoropacitymax: '0.4', cursorcolor: '#FFF', cursorborder: "1px solid #FFF")

 # Initialize tooltips
  $('body').tooltip(
    selector: '.has-tooltip, [data-toggle="tooltip"]'
    placement: (_, el) ->
      $el = $(el)
      $el.data('placement') || 'bottom'
  )

  $('.header-logo .home').tooltip(
    placement: (_, el) ->
      $el = $(el)
      if $('.page-with-sidebar').hasClass('page-sidebar-collapsed') then 'right' else 'bottom'
    container: 'body'
  )

  $('.page-with-sidebar').tooltip(
    selector: '.sidebar-collapsed .nav-sidebar a, .sidebar-collapsed a.sidebar-user'
    placement: 'right'
    container: 'body'
  )



  $('.navbar-toggle').on 'click', ->
    $('.header-content .title').toggle()
    $('.header-content .navbar-collapse').toggle()
    $('.navbar-toggle').toggleClass('active')
