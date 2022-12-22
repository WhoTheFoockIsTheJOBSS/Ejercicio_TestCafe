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

test('test 2', async t => {

    function randomData(array){
        return array[Math.floor(Math.random()*array.length)]
    }
    
        //Verify that devices can be created properly using the UI.
        devicesPAge.clickOnAddDevice();

        const name = `DEVICE-${faker.name.firstName()}`;
        addDevicePage.setName(name);

        const arrayOptions = Selector('#type option');
        await t
        .click(Selector('#type'))
        .click(Selector('#type option').nth(randomData([0,1,2])));

        const randomHdd = ['128', '240', '500','1000'];
        addDevicePage.setHdd(randomData(randomHdd));

        addDevicePage.clickOnSaveBtn();

        console.log(name, await arrayOptions.count);

    //Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });

    let list = response.body;
    for(let i=0; i<list.length; i++){
        const {system_nameSelector, system_typeSelector, system_capacitySelector} = 
        await devicesPAge.findingElementText(list[i].system_name, list[i].type, list[i].hdd_capacity);
        await t.expect(system_nameSelector.visible).ok();
        await t.expect(system_typeSelector.visible).ok();
        await t.expect(system_capacitySelector.visible).ok();
    };
});
