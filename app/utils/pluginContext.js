/**
 * Created by kinneretzin on 11/09/2016.
 */


export default class Context {
    constructor(setContextValue,contextData,onDrilldownToPage,onRefresh,templates,manager) {
        this._setValue = setContextValue;
        this._data = contextData;

        this._onDrilldowToPage = onDrilldownToPage;
        this._onRefresh = onRefresh;
        this._templates = templates;
        this._manager = manager;
    }
    setValue(key,value) {
        this._setValue(key,value);
    }
    getValue(key) {
        return this._data[key];
    }

    drillDown(widget,defaultTemplate) {
        this._onDrilldowToPage(widget,this._templates[defaultTemplate]);
    }

    getManagerUrl() {
        return `http://localhost:8000/?su=http://${this._manager.ip}`;
    }

    refresh() {
        this._onRefresh();
    }

}

