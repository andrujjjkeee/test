"use strict";

$( function(){

    new SiteOldAnimations();

    new  MobileMenu( $( '.mobile-menu' )  );

    $.each( $( '.tabs' ), function() {
        new  Tabs( $( this ) );
    } );

    $.each( $( '.hero' ), function() {
        new  InitSlider( $( this ) );
    } );

} );

var MobileMenu = function( obj ) {

    //private properties
    var _self = this,
        _obj = obj,
        _mobileBtn = $( '.hamburger' ),
        _html = $( 'html' ),
        _body = $( 'body' ),
        _site = _body.find( '.site' ),
        _window = $( window ),
        _position = 0;

    //private methods
    var _onEvent = function() {

            _mobileBtn.on( 'click', function () {

                if ( $( this ).hasClass( 'is-active' ) ){
                    _hideMobileMenu();
                } else {
                    _showMobileMenu();
                }

                return false;
            } );

        },
        _hideMobileMenu = function () {

            _mobileBtn.removeClass( 'is-active' );

            _obj.removeClass( 'is-show' );

            _html.css( 'overflow-y', 'visible' );
            _body.removeAttr( 'style' );
            _site.removeAttr( 'style' );

            _window.scrollTop( _position );

        },
        _showMobileMenu = function () {

            _mobileBtn.addClass( 'is-active' );

            _obj.addClass( 'is-show' );

            _position = _window.scrollTop();

            _html.css( 'overflow-y', 'hidden' );
            _body.css( 'overflow-y', 'hidden' );

            _site.css( {
                'position': 'relative',
                'top': _position * -1
            } );

        },
        _construct = function() {
            _onEvent();

            _obj[ 0 ].obj = _self;

        };

    //public properties
    _self.opened = false;

    //public methods
    _self.closeMenu = function(){
        _hideMobileMenu();
    };

    _construct();
};

var InitSlider = function( obj ) {

    //private properties
    var _obj = obj,
        _swiperSlider = _obj.find('.hero__slider'),
        _btnPrev = _obj.find( '.hero__btn-prev' ),
        _btnNext = _obj.find( '.hero__btn-next' ),
        _pagination = _obj.find( '.hero__pagination' ),
        _swiper;

    //private methods
    var _initSlider = function(){

            _swiper = new Swiper(_swiperSlider, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                threshold: 10,
                navigation: {
                    nextEl: _btnNext,
                    prevEl: _btnPrev
                },
                pagination: {
                    el: _pagination,
                    type: 'bullets',
                }
            });

        },
        _construct = function() {
            _initSlider();
        };

    //public properties

    //public methods

    _construct();
};

var SiteOldAnimations = function() {

    //private properties
    var _window = $( window ),
        _obj = $('#counters');

    //private methods
    var _onEvents = function() {

            _window.on( 'scroll', _move );

        },
        _move = function(){

            var winHeight = $(window).height(),
                scrollTop = $(window).scrollTop();

            _obj.each( function() {
                var curElem = $(this),
                    curTop = curElem.offset().top,
                    curHeight = curElem.height();

                if ( ( scrollTop <= ( curTop + curHeight ) && ( ( winHeight + scrollTop ) >= curTop ) ) ) {
                    _setNumber();
                }

            } );

        },
        _setNumber = function () {

            _window.off( 'scroll', _move );

            var frame = _obj.find( 'dd' ),
                duration = 1000;

            frame.each( function () {

                var curElem = $( this ),
                    number = curElem.data( 'number' ),
                    stepTime = Math.abs( Math.floor( duration / number ) ),
                    i = 0,
                    timer;

                timer = setInterval( function() {

                    i = i + 1;

                    curElem.text( i );

                    if ( i == number ) {

                        clearInterval( timer );

                    }

                }, stepTime );

                setTimeout( function () {

                    clearInterval( timer );
                    curElem.text( number );

                }, duration )

            } );

        },
        _construct = function() {
            _onEvents();
        };

    //public properties

    //public methods

    _construct();
};

var Tabs = function( obj ) {

    //private properties
    var _obj = obj,
        _tabBtn = _obj.find( '.tabs__item' ),
        _window = $( window );

    //private methods
    var _onEvent = function() {

            _tabBtn.on( 'click', function () {

                var curBtn = $( this ),
                    curBtnWrap = curBtn.parent( 'dl' ),
                    curBtnIndex = curBtnWrap.index();

                _tabBtn.removeClass( 'active' );

                _showTabWrap( curBtnIndex );

                return false;
            } );

            _window.on( 'resize', function () {
                _setContentHeight();
            } );

        },
        _showTabWrap = function ( num ) {

            var curTabIndex = num,
                curTabBtn = _tabBtn.eq( curTabIndex ),
                curTabWrap = curTabBtn.next( 'dd' );

            curTabBtn.addClass( 'active' );

            _obj.css( 'padding-bottom', curTabWrap.outerHeight() );

        },
        _setContentHeight = function () {

            var activeContent = _tabBtn.filter( '.active' ).next( 'dd' );

            _obj.css( 'padding-bottom', activeContent.outerHeight() );

        },
        _construct = function() {
            _onEvent();
            _showTabWrap( 0 );
        };

    //public properties

    //public methods

    _construct();
};
