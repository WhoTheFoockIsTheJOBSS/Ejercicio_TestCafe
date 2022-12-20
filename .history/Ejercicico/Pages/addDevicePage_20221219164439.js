import { Selector, t } from "testcafe";

 class AddPage{

    constructor(){
        this.systemNameInput = Selector('input#system_name');
        this.typeSelect = Selector('select#type');
        this.hddCapacityInput = Selector('input#hdd_capacity')
        this.saveBtn = Selector('button.submitButton');
    }

    async setName(systemName){
        await t.typeText(this.systemNameInput, systemName);
    };

    // async setType(type){
    //     await t.typeText(this.typeSelect);
    //     await t.click(`option[value="${type}"]`);
    // };

    async setHdd(capacity){
        await t.typeText(this.hddCapacityInput, capacity);
    };

    async clickOnSaveBtn(){
        await t.click(this.saveBtn);
    };
 }

 export default new AddPage();