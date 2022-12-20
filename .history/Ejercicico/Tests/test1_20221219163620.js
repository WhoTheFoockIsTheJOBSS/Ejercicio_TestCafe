const { t, Selector, ClientFunction } = require("testcafe");
import XPathSelector from '../../../lib/xpath-selector';
const { default: HomePage } = require("../../pageObjectModel/pages/HomePage");
const { default: homePage } = require("../Page/home");

let response;
let body;

fixture('test 1');

test.skip('Get Devices List', async t => {

    //homePage.APIcallGET();

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });

    console.log( response.body);
    await t.expect(response.status).eql(200);
    await t.expect(response.statusText).eql('OK');
});

test.skip.page('http://localhost:3001/')('Verifi list in UI', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    }); 

    body = response.body;
        
        body.forEach( async device => {                 
        
            //console.log(device);
            //console.log(device.system_name);
            const device_name = XPathSelector(`//span[normalize-space()=${device.system_name}]`);
            // const device_name = Selector(`div[class='list-devices'] div:nth-child(${device}) div:nth-child(1) span:nth-child(1)`);
            console.log(device_name.innerText);
            await t.expect(device_name.innerText).eql(device.system_name);
                
            // console.log(device.type);
            // const device_type = Selector(`div[class='list-devices'] div:nth-child(${device}) div:nth-child(1) span:nth-child(2)`);
            // await t.expect(device_type.innerText).eql(device.type);
        
            // console.log(device.hdd_capacity);
            // const device_capacity = Selector(`div[class='list-devices'] div:nth-child(${device}) div:nth-child(1) span:nth-child(3)`);
            // await t.expect(device_capacity.innerText).eql(device.hdd_capacity);
    }); 
});

test.page('http://localhost:3001/')('Button in UI', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });
    
    response.body.forEach( async device => {        
        
        const IDdevice = device.id;

        const editBtn = Selector(`a[href="/devices/edit/${IDdevice}"]`);
        const editBtnText = await editBtn.innerText;

        console.log(`${device.id} + ${editBtnText}`);
        t.expect(editBtnText).eql('EDIT', 'Existe en el DOM');
        //await t.expect(editBtnText).eql('xxx', 'Accordion Items Count', {timeout: 5000});
        
    }); 
});