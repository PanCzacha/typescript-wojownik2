import {createPool} from "mysql2/promise";
import { v4 as uuid } from 'uuid';

export {
    uuid,
};

export const pool = createPool({
    host: "localhost",
    user: "root",
    database: "megak_warrior2",
    namedPlaceholders: true,
    decimalNumbers: true,
});
