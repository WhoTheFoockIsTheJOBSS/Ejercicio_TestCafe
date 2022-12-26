import { Selector, t } from "testcafe";

 class addDevicesPage{

    constructor(){    }

    get systemNameInput(){
        return Selector('input#system_name')
    };
    async setName(systemName){
        await t.typeText(this.systemNameInput, systemName);
    };

    get typeDD(){
        return Selector('#type')
    };
    async setType(){

        function randomData(array){
            return array[Math.floor(Math.random()*array.length)]
        }

        const options = ['WINDOWS WORKSTATION', 'WINDOWS SERVER', 'MAC'];
        const option = this.typeDD().find('option');

        await t
        .click(this.typeDD())
        .click(option.withText(randomData(options)));
    };

    get hddCapacityInput(){
        return Selector('input#hdd_capacity')
    };
    async setHdd(capacity){
        await t.typeText(this.hddCapacityInput, capacity);
    };

    get saveBtn(){
        return Selector('button.submitButton')
    };
    async clickOnSaveBtn(){
        await t.click(this.saveBtn);
    };
 }
 export default new addDevicesPage();
