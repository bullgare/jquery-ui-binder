"use strict";

/**
 * test widget
 */
	$.widget( "ui.test_widget", $.ui.extension_binder,
	{
		options:
		{
			eventName: 'test_widget_eventname_default'
		},
		bind_: function ( EventName )
		{
			var me = this;

			EventName = EventName || me.options.eventName;
			me.bindSmart( EventName, function ( Event ) {
				genericHandler( Event );
			} );
		},
		trigger_: function ( EventName )
		{
			var me = this;

			EventName = EventName || me.options.eventName;
			me.triggerSmart( EventName );
		},
		unbind_: function ( EventName )
		{
			var me = this;

			EventName = EventName || me.options.eventName;
			me.unbindSmart( EventName );
		}
	} );


/**
 * Generic handler for testing purpose
 *
 * @since  29.07.12
 * @author bullgare
 */
	function genericHandler( Event )
	{
		var old = $( Event.target ).data( 'genericHandlerRuns' ) || 0;
		$( Event.target ).data( 'genericHandlerRuns', old + 1 );
	}
//===========================================================================}}}
/**
 * Generic handler for testing purpose
 *
 * @since  29.07.12
 * @author bullgare
 */
	function genericHandler2( Event )
	{
		var old = $( Event.target ).data( 'genericHandler2Runs' ) || 0;
		$( Event.target ).data( 'genericHandler2Runs', old + 1 );
	}
//===========================================================================}}}
/**
 * (Re-)create initial elements
 *
 * @since  29.07.12
 * @author bullgare
 */
	function createInitialElements()
	{
		var $wrapper = $('#js-wrapper' ).
			html( '<div id="js-el1"></div><div id="js-el2"></div>' );
		return {$el1: $( '#js-el1', $wrapper ), $el2: $( '#js-el2', $wrapper )};
	}
//===========================================================================}}}



