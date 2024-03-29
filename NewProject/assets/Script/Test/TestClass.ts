interface HXAppInfo {
    initOtherSDK();
    getClientInfo(): string;
}

class HXAAACalliOS implements HXAppInfo {
    initOtherSDK() {

    }
    getClientInfo(): string {
        return "";
    }
}