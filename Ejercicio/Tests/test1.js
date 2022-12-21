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
    //type and capacity of each element of the list using the class names and make sure they are correctly displayed.
        
    response.body.forEach( async device => {   
        
        let i;
        for (i=1; i<10; i++);

        const selectorName = Selector(`div[class='list-devices'] div:nth-child(${i}) div:nth-child(1) span:nth-child(1)`); 
        const selectType = Selector(`div[class='list-devices'] div:nth-child(${i}) div:nth-child(1) span:nth-child(2)`);
        const selectHdd = Selector(`div[class='list-devices'] div:nth-child(${i}) div:nth-child(1) span:nth-child(3)`);
        
        console.log(selectorName.innerText);
        await t.expect(selectorName.innerText).eql(device.system_name)
        await t.expect(selectType.innerText).eql(device.type)
        await t.expect(selectHdd.innerText).eql(device.hdd_capacity);  
        
        //Verify that all devices contain the edit and delete buttons.

        const editBtn = Selector(`div[class='list-devices'] div:nth-child(${i}) div:nth-child(2) a:nth-child(1)`);
        const removeBtn = Selector(`div:nth-child(${i}) > div:nth-child(2) > button:nth-child(2)`);

        await t.expect(editBtn.exists).ok()
        await t.expect(removeBtn.exists).ok();
    }); 

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