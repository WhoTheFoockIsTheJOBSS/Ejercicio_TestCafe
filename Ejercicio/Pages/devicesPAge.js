import { Selector, t } from "testcafe";

 class devicesPage{

    constructor(){  }

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

    get addDeviceBtn(){
        return Selector('a.submitButton')
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
