const { t, Selector, ClientFunction } = require("testcafe");
import addDevicePage from '../Pages/addDevicePage';
import devicesPAge from '../Pages/devicesPAge';

fixture.page('http://localhost:3001/')('Ejercicio_TestCafe');

let response;
let body;

test('test 1', async t => {
    
    //Make an API call to retrieve the list of devices
    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });

    //Use the list of devices to check the elements are visible in the DOM. Check the name, 
    //type and capacity of each element of the list using the class names and make sure they are correctly displayed
    
    let list = response.body;

    for(let i=0; i<list.length; i++){
        const {system_nameSelector, system_typeSelector, system_capacitySelector} = 
        await devicesPAge.findingElementText(list[i].system_name, list[i].type, list[i].hdd_capacity);
        await t.expect(system_nameSelector.visible).ok();
        await t.expect(system_typeSelector.visible).ok();
        await t.expect(system_capacitySelector.visible).ok();


        //Verify that all devices contain the edit and delete buttons.
        const editBtn = Selector('a.device-edit').nth(i);
        const removeBtn = Selector('button.device-remove').nth(i);
        await t.expect(editBtn.visible).ok();
        await t.expect(removeBtn.visible).ok();
    };
});

test.skip('test 2', async t => {

    //Verify that devices can be created properly using the UI.
    devicesPAge.clickOnAddDevice();
    
    await t.wait(4000);

    const name = 'NEW-DEVICE';
    addDevicePage.setName(name);
    
    await t
    .click(Selector('select#type'))
    .click(Selector('option[value=MAC]'));

    const hdd = '500';
    addDevicePage.setHdd(hdd);
    addDevicePage.clickOnSaveBtn();
    
    //Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
    await t
    .expect(Selector('div:nth-child(8) div:nth-child(1) span:nth-child(1)').visible).ok()
    .expect(Selector('div:nth-child(8) div:nth-child(1) span:nth-child(2)').visible).ok()
    .expect(Selector('div:nth-child(8) div:nth-child(1) span:nth-child(3)').visible).ok()
    .wait(5000);
    
});
