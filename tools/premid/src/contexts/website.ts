import type { Presence } from "../classes/Presence.js";
import type { defineLogs } from "../moveToExtension/defineLogs.js";
import type { PresenceConfig } from "../presence.js";
import type { Actual, Awaitable, I18n, I18nStrings, SettingsObject } from "../utils.js";
import { WebsiteConfig } from "../website.js";

export type WebsitePresenceCallback<Config extends PresenceConfig> = (context: WebsitePresenceContext<Config>) => Awaitable<void>;

export type WebsitePresenceContext<Config extends PresenceConfig> = Readonly<{
	presence: Presence<Config>;
	config: Actual<Omit<Config, "website">>;
	settings: SettingsObject<Config>;
	extensionVersion: number;
	language: string;

	info: (message: string) => void;
	error: (message: string) => void;
	success: (message: string) => void;

	fetchStrings: <I18nString extends I18nStrings>(...stringsToFetch: I18nString[]) => Promise<I18n<I18nString>>;
	getLogs: Config["website"] extends WebsiteConfig ? (Config["website"]["readLogs"] extends true ? ReturnType<typeof defineLogs<Config>> : never) : never;
	getPageVariable: <T extends Record<string, unknown>>(...variables: string[]) => Promise<T>;
}>;

// TODO getTimestamps
// TODO getTimestampsFromMedia
// TODO timestampFromFormat
// TODO createSlideshow
// TODO Slideshow
// TODO IframeData event

/**
 * Get the context for the website presence.
 *
 * Note: Do **NOT** destructure the context object outside of lifecycle functions, as it will make the context object stale.
 * You can destructure the context object inside lifecycle functions, as it will be updated when the lifecycle function is called.
 */
export function getContext<Config extends PresenceConfig>(): WebsitePresenceContext<Config> {
	return {} as WebsitePresenceContext<Config>;
}