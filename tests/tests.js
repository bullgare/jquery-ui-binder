"use strict";

describe( 'on start', function () {
	createInitialElements();
	var $el1 = $( '#js-el1' ),
		$el2 = $( '#js-el2' );
	it( 'test DOM elements el1 and el2 are there', function () {
		expect( $el1 ).toBeDefined();
		expect( $el2 ).toBeDefined();

		expect( $el1.jquery ).toBeDefined();
		expect( $el2.jquery ).toBeDefined();

		expect( $el1.length ).toBe( 1 );
		expect( $el2.length ).toBe( 1 );
	} );

	it( 'can really apply widget to an element', function () {
		$el1.test_widget();

		expect( $el1.test_widget ).toBeDefined();
		expect( typeof $el1.test_widget ).toBe( 'function' );

		var widgetObj = $el1.data( 'test_widget' );
		expect( widgetObj ).toBeDefined();
		expect( typeof widgetObj ).toBe( 'object' );

	} );
} );

describe( 'binding by both widget and manually', function () {
	var struct;

	beforeEach( function () {
		struct = createInitialElements();
		struct.$el1.test_widget();
		struct.$el1.test_widget( 'bind_' );
	} );

	it( 'smart bind actually binds', function () {
		spyOn( window, 'genericHandler' ).andCallThrough();
		struct.$el1.trigger( struct.$el1.data( 'test_widget' ).options.eventName );
		expect( genericHandler ).toHaveBeenCalled();
		expect( struct.$el1.data( 'genericHandlerRuns' ) ).toBe( 1 );
	} );

	it( 'binding and triggering: handlers without proper namespace are not called', function () {
		struct.$el1.bind( struct.$el1.data( 'test_widget' ).options.eventName, genericHandler2 );

		spyOn( window, 'genericHandler' ).andCallThrough();
		spyOn( window, 'genericHandler2' ).andCallThrough();

		struct.$el1.test_widget( 'trigger_' );
		// unfortunately there's a bug in jasmine or something strange happens. Anyway, the handler is called but spy doesn't know it
		// expect( genericHandler ).toHaveBeenCalled();
		// expect( genericHandler2 ).not.toHaveBeenCalled();
		expect( struct.$el1.data( 'genericHandlerRuns' ) ).toBe( 1 );
		expect( struct.$el1.data( 'genericHandler2Runs' ) ).toBeUndefined();
	} );

	it( 'binding and triggering: manual triggering the event without namespace will be handled by both handlers', function () {
		var eventName = struct.$el1.data( 'test_widget' ).options.eventName;

		struct.$el1.bind( eventName, genericHandler2 );

		spyOn( window, 'genericHandler' ).andCallThrough();
		spyOn( window, 'genericHandler2' ).andCallThrough();

		struct.$el1.trigger( eventName );
		// unfortunately there's a bug in jasmine or something strange happens. Anyway, the handler is called but spy doesn't know it
		// expect( genericHandler ).toHaveBeenCalled();
		// expect( genericHandler2 ).toHaveBeenCalled();
		expect( struct.$el1.data( 'genericHandlerRuns' ) ).toBe( 1 );
		expect( struct.$el1.data( 'genericHandler2Runs' ) ).toBe( 1 );
	} );

	it( 'is properly unbinding, so after that manual triggering the event without namespace will be handled by manual bound handler only', function () {
		struct.$el1.test_widget( 'bind_' );

		var eventName = struct.$el1.data( 'test_widget' ).options.eventName;

		struct.$el1.bind( eventName, genericHandler2 );

		spyOn( window, 'genericHandler' ).andCallThrough();
		spyOn( window, 'genericHandler2' ).andCallThrough();

		struct.$el1.test_widget( 'unbind_' );

		struct.$el1.trigger( eventName );

		// unfortunately there's a bug in jasmine or something strange happens. Anyway, the handler is called but spy doesn't know it
		// expect( genericHandler2 ).toHaveBeenCalled();
		// expect( genericHandler ).not.toHaveBeenCalled();
		expect( struct.$el1.data( 'genericHandlerRuns' ) ).toBeUndefined();
		expect( struct.$el1.data( 'genericHandler2Runs' ) ).toBe( 1 );
	} );

	it( 'binding several times will not lead to several calls on trigger', function () {
		struct.$el1.test_widget( 'bind_' );
		struct.$el1.test_widget( 'bind_' );
		struct.$el1.test_widget( 'bind_' );
		struct.$el1.test_widget( 'bind_' );
		struct.$el1.test_widget( 'bind_' );

		struct.$el1.test_widget( 'trigger_' );

		expect( struct.$el1.data( 'genericHandlerRuns' ) ).toBe( 1 );
	} );

} );

describe( 'two widgets on one element', function () {
	// TODO
} );
