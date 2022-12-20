const { t, Selector, ClientFunction } = require("testcafe");
import XPathSelector from '../../../lib/xpath-selector';
import addPage from '../Page/addPage';

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
    addPage.setName(name);
    //addPage.setType('MAC');
    const hdd = '500';
    addPage.setHdd(hdd);
    addPage.clickOnSaveBtn();

    await t.expect(getUrl()).eql('http://localhost:3001/').wait(5000);
    await t.expect(XPathSelector(`//span[normalize-space()=${name}]`)).exists;
    await t.wait(5000);
});
