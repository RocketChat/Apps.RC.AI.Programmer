import {
	ISetting,
	SettingType,
} from '@rocket.chat/apps-engine/definition/settings';
export enum AppSettingsEnum {
    BaseHostID = "base_host_id",
    BaseHostLabel = "base_host_label",
    BaseHostPackageValue = "https://github.com/",
    BaseApiHostID = "base_api_host_id",
    BaseApiHostLabel = "base_api_host_label",
    BaseApiHostPackageValue = "https://api.github.com/"
}
export const settings: ISetting[] = [
    {
        id: AppSettingsEnum.BaseHostID,
        i18nLabel: AppSettingsEnum.BaseHostLabel,
        type: SettingType.STRING,
        required: true,
        public: false,
        packageValue: AppSettingsEnum.BaseHostPackageValue,
    },
    {
        id: AppSettingsEnum.BaseApiHostID,
        i18nLabel: AppSettingsEnum.BaseApiHostLabel,
        type: SettingType.STRING,
        required: true,
        public: false,
        packageValue: AppSettingsEnum.BaseApiHostPackageValue,
    },
];
