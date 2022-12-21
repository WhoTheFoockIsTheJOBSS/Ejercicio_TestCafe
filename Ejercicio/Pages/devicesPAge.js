import { Selector, t } from "testcafe";

 class devicesPage{

    constructor(){
        this.deviceTypeDD = Selector('select#device_type');
        this.sortByDD = Selector('select#sort_by');
        this.addDeviceBtn = Selector('a.submitButton');
        this.deviceType = Selector('span.device-type');
        this.deviceCapacity = Selector('span.device-capacity')
    }

    get device_name(){
        return Selector('.device-info .device-name')
    };

    get device_type(){
        return Selector('.device-info .device-type')
    };

    get device_capacity(){
        return Selector('.device-info .device-capacity')
    };

    get edit_button(){
        return Selector('a.device-edit')
    };

    get remove_button(){
        return Selector('button.device-remove')
    };

    async deviceOptionsButtons(id, index){
        const buttonEdit = this.edit_button().withText(id);
        const buttonRemove = this.remove_button(index);
        return(buttonEdit, buttonRemove)
    };

    async clickOnDeviceType(){
        await t.click(this.deviceTypeDD);
        await t.click(Selector("option[value='ALL']"));
    };

    async clickOnSortBy(){
        await t.click(this.sortByDD);
    };

    async clickOnAddDevice(){
        await t.click(this.addDeviceBtn);
    };

    async findingElementText(system_name, type, hdd_capacity){
        const system_nameSelector = this.device_name().withText(system_name);
        const system_typeSelector = this.device_type().withText(type);
        const system_capacitySelector = this.device_capacity().withText(hdd_capacity);
        
        return{system_nameSelector, system_typeSelector, system_capacitySelector}
    }
 }

 export default new devicesPage();
