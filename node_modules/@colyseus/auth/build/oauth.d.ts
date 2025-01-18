import { Router } from 'express';
import { GrantProvider, GrantSession } from 'grant';
import { MayHaveUpgradeToken } from './auth';
export type OAuthProviderName = '23andme' | '500px' | 'acton' | 'acuityscheduling' | 'adobe' | 'aha' | 'alchemer' | 'amazon' | 'angellist' | 'apple' | 'arcgis' | 'asana' | 'assembla' | 'atlassian' | 'auth0' | 'authentiq' | 'authing' | 'autodesk' | 'aweber' | 'axosoft' | 'baidu' | 'basecamp' | 'battlenet' | 'beatport' | 'bitbucket' | 'bitly' | 'box' | 'buffer' | 'campaignmonitor' | 'cas' | 'cheddar' | 'clio' | 'cognito' | 'coinbase' | 'concur' | 'constantcontact' | 'coursera' | 'crossid' | 'dailymotion' | 'deezer' | 'delivery' | 'deputy' | 'deviantart' | 'digitalocean' | 'discogs' | 'discord' | 'disqus' | 'docusign' | 'dribbble' | 'dropbox' | 'ebay' | 'echosign' | 'ecwid' | 'edmodo' | 'egnyte' | 'etsy' | 'eventbrite' | 'evernote' | 'eyeem' | 'facebook' | 'familysearch' | 'feedly' | 'figma' | 'fitbit' | 'flickr' | 'formstack' | 'foursquare' | 'freeagent' | 'freelancer' | 'freshbooks' | 'fusionauth' | 'garmin' | 'geeklist' | 'genius' | 'getbase' | 'getpocket' | 'gitbook' | 'github' | 'gitlab' | 'gitter' | 'goodreads' | 'google' | 'groove' | 'gumroad' | 'harvest' | 'hellosign' | 'heroku' | 'homeaway' | 'hootsuite' | 'huddle' | 'ibm' | 'iconfinder' | 'idme' | 'idonethis' | 'imgur' | 'infusionsoft' | 'instagram' | 'intuit' | 'jamendo' | 'jumplead' | 'kakao' | 'keycloak' | 'line' | 'linkedin' | 'live' | 'livechat' | 'logingov' | 'lyft' | 'mailchimp' | 'mailup' | 'mailxpert' | 'mapmyfitness' | 'mastodon' | 'medium' | 'meetup' | 'mendeley' | 'mention' | 'microsoft' | 'mixcloud' | 'moxtra' | 'myob' | 'naver' | 'nest' | 'netlify' | 'nokotime' | 'notion' | 'nylas' | 'okta' | 'onelogin' | 'openstreetmap' | 'optimizely' | 'osu' | 'patreon' | 'paypal' | 'phantauth' | 'pinterest' | 'plurk' | 'podio' | 'procore' | 'producthunt' | 'projectplace' | 'pushbullet' | 'qq' | 'ravelry' | 'redbooth' | 'reddit' | 'runkeeper' | 'salesforce' | 'sellsy' | 'shoeboxed' | 'shopify' | 'skyrock' | 'slack' | 'slice' | 'smartsheet' | 'smugmug' | 'snapchat' | 'snowflake' | 'socialpilot' | 'socrata' | 'soundcloud' | 'spotify' | 'square' | 'stackexchange' | 'stocktwits' | 'stormz' | 'storyblok' | 'strava' | 'stripe' | 'surveymonkey' | 'surveysparrow' | 'thingiverse' | 'ticketbud' | 'tiktok' | 'timelyapp' | 'todoist' | 'trakt' | 'traxo' | 'trello' | 'tripit' | 'trustpilot' | 'tumblr' | 'twitch' | 'twitter' | 'typeform' | 'uber' | 'unbounce' | 'underarmour' | 'unsplash' | 'untappd' | 'upwork' | 'uservoice' | 'vend' | 'venmo' | 'vercel' | 'verticalresponse' | 'viadeo' | 'vimeo' | 'visualstudio' | 'vk' | 'wechat' | 'weekdone' | 'weibo' | 'withings' | 'wordpress' | 'workos' | 'wrike' | 'xero' | 'xing' | 'yahoo' | 'yammer' | 'yandex' | 'zendesk' | 'zoom';
export type OAuthProviderConfig = {
    /**
     * consumer_key or client_id of your OAuth app
     */
    key: string;
    /**
     * consumer_secret or client_secret of your OAuth app
     */
    secret: string;
    /**
     * array of OAuth scopes to request
     */
    scope?: string[];
    /**
     * generate random nonce string (OpenID Connect only)
     */
    nonce?: boolean;
    /**
     * custom authorization parameters
     */
    custom_params?: any;
    /**
     * relative route or absolute URL to receive the response data /hello | https://site.com/hey
     */
    callback?: string;
    /**
     * relative route or absolute URL to receive the response data /hello | https://site.com/hey
     */
    response?: Array<'tokens' | 'raw' | 'jwt' | 'profile'>;
};
export type OAuthProviderCallback = (data: GrantSession['response'] & MayHaveUpgradeToken, provider: OAuthProviderName) => Promise<unknown>;
export declare let oAuthProviderCallback: (data: GrantSession['response'] & MayHaveUpgradeToken, provider: OAuthProviderName) => Promise<unknown>;
export declare const oauth: {
    /**
     * Default 'grant' module configuration.
     */
    defaults: GrantProvider & {
        prefix: never;
    };
    /**
     * Route prefix for OAuth routes.
     */
    prefix: string;
    providers: { [providerId in OAuthProviderName]: OAuthProviderConfig; };
    /**
     * Add OAuth provider configuration.
     * @param providerId OAuth provider name
     * @param config OAuth provider configuration
     */
    addProvider: (providerId: OAuthProviderName, config: OAuthProviderConfig) => void;
    /**
     * Provides a callback function that is called when OAuth is successful.
     */
    onCallback: (callback: OAuthProviderCallback) => void;
    /**
     * Returns an Express Router that handles OAuth for configured providers.
     * @param callback (optional) Callback function that is called when OAuth is successful.
     * @returns Express Router
     */
    routes: (callback?: OAuthProviderCallback) => Router;
    /**
     * Transform raw profile data into a single object.
     * (e.g. Twitch returns an array of profiles, but we only need the first one)
     * @param raw
     */
    transformProfileData(raw: any): any;
};
