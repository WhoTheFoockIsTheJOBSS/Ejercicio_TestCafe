import { Selector, t } from "testcafe";
import { faker } from '@faker-js/faker';
import devicesPAge from "./devicesPAge";

class Devices{

    async deviceData(){
        const system_name = `DEVICE-${faker.name.firstName()}`;
        const type = "WINDOWS_WORKSTATION";
        const hdd_capacity = "10";

        return{system_name, type, hdd_capacity}
    }
}
export default new Devices();
