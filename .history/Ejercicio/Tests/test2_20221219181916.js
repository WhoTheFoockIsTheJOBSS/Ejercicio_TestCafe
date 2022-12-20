const { t, Selector, ClientFunction } = require("testcafe");
import XPathSelector from 'lib/xpath-select';
import addDevicePage from '../Pages/addDevicePage';

const url = 'http://localhost:3001/';
const getUrl = ClientFunction(() => window.location.href)

fixture('test 2').page(url)

test('Loading main page', async t=> {

    await t 
    .expect(getUrl()).contains(url)
    .expect(Selector('a.submitButton').exists).ok('el boton existe en la pagina');
});


test('Adding new device', async t=> {

    await t
    .click('a.submitButton')
    .expect(getUrl()).eql('http://localhost:3001/devices/add');

    const name = 'Asus-LAptop';
    addDevicePage.setName(name);
    
    const hdd = '500';
    addDevicePage.setHdd(hdd);
    addDevicePage.clickOnSaveBtn();

    await t.expect(getUrl()).eql('http://localhost:3001/').wait(5000);
    await t
    .expect(XPathSelector(`//span[normalize-space()=${name}]`)).exists
    .expect(XPathSelector(`//span[normalize-space()='${hdd} GB']`)).exists;
    await t.wait(5000);
});
