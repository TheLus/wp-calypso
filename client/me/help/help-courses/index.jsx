/**
 * External dependencies
 */
import { connect } from 'react-redux';
import i18n, { localize } from 'i18n-calypso';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import Courses from './courses';
import {
	getUserPurchases,
	hasLoadedUserPurchasesFromServer
} from 'state/purchases/selectors';
import { getCurrentUserId } from 'state/current-user/selectors';
import { PLAN_BUSINESS } from 'lib/plans/constants';

const courses = [
	{
		title: i18n.translate( 'How to Make a Business Site on WordPress.com' ),
		description: i18n.translate(
			'Bacon ipsum dolor amet jowl swine t-bone capicola porchetta andouille' +
			'pork chop tail chicken. Ball tip frankfurter ham pastrami pork chop shank pork loin, bacon prosciutto. ' +
			'Turducken pig meatloaf short ribs kielbasa. Chicken swine spare ribs ball tip pork loin cow drumstick ' +
			'tail tongue venison tenderloin short ribs kielbasa salami. Andouille boudin prosciutto jowl tongue, bacon ' +
			'chuck tail flank ball tip strip steak leberkas filet mignon. Tri-tip pancetta prosciutto spare ribs ball tip.'
		),
		schedule: [
			{
				date: i18n.moment( new Date( '8/25/2016 1:00 pm PST' ) ),
				registrationUrl: 'http://wordpress.com'
			},
			{
				date: i18n.moment( new Date( '8/27/2016 9:00 am PST' ) ),
				registrationUrl: 'http://wordpress.com'
			},
			{
				date: i18n.moment( new Date( '8/31/2016 10:30 am PST' ) ),
				registrationUrl: 'http://wordpress.com'
			},
		],
		recent: [
			{
				date: i18n.moment( new Date( '8/1/2016 10:30 am PST' ) ),
				video: 'http://wordpress.com/some-video.mp4'
			}
		]
	}
];

function mapStateToProps( state ) {
	const userId = getCurrentUserId( state );
	const purchases = getUserPurchases( state, userId );
	const showRecentCourseRecordings = purchases && !! find( purchases, purchase => purchase.productSlug === PLAN_BUSINESS );
	const isLoading = ! hasLoadedUserPurchasesFromServer( state );

	//TODO: Add tracks pings

	return {
		isLoading,
		showRecentCourseRecordings,
		userId,
		courses
	};
}

export default connect( mapStateToProps )( localize( Courses ) );
