// wrapping into IIFE for not to pollute the global namespace
(function( $ )
{
	"use strict";
/**
 * extending jquery-ui. there are just bind, unbind and trigger methods at the moment
 */
	$.widget( "ui.extension_binder",
		{
		/**
		 * Trigger event on base element
		 * @param {String} EventName without namespace
		 * @param {Object} Data
		 * @return {Object} jquery-ui object
		 */
			triggerSmart: function( EventName, Data )
			{
				var me = this,
					$me = $( me.element );

				$me.trigger( EventName + '.' + me.widgetName, Data );
				return me;
			},
		/**
		 * Bind handler on base element preventing double binding
		 * @param {String} EventName without namespace
		 * @param {Function} Handler
		 * @return {Object} jquery-ui object
		 */
			bindSmart: function( EventName, Handler )
			{
				var me = this,
					$me = $( me.element ),
				// all bindings on base element
					events = $.data( $me.get( 0 ), 'events' ),
					boundEvents = me._getSmartBoundEvents( events, EventName );

				if ( ! boundEvents.length ) {
					$me.bind( EventName + '.' + me.widgetName, Handler );
				}
				return me;
			},
		/**
		 * Unbind handler(s) on base element
		 * @param {String} EventName [optional] if not provided - remove all event handlers for this widget
		 * @return {Object} jquery-ui object
		 */
			unbindSmart: function( EventName )
			{
				var me = this,
					unbindString = '.' + me.widgetName;
				if ( EventName ) {
					unbindString = EventName + unbindString;
				}

				$( me.element ).unbind( unbindString );
				return me;
			},
		//===========================================================================}}}

		/**
		 * Filter all events getting only bound by bindSmart method and (optionally) having an exact name
		 * @param {Array} Events jquery-bound events
		 * @param {String} EventNameToFind
		 * @private
		 * @return {Array} filtered events
		 */
			_getSmartBoundEvents: function(Events, EventNameToFind)
			{
			// no events - no work needed
				if ( ! Events || ! ( EventNameToFind in Events ) ) {
					return [];
				}

				var namespace = this.widgetName,
					filteredEvents;

				Events = Events[EventNameToFind];

				filteredEvents = $.grep( Events, function( Event ) {
					return Event.namespace == namespace && ( EventNameToFind && Event.type == EventNameToFind );
				} );
				return filteredEvents;
			}
		//===========================================================================}}}
		} );
}( jQuery ));
