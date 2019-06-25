/**
 * File: socket.io.js
 * Project: mini-twitter
 * File Created: Sunday, 5th May 2019 10:17:17 pm
 * Author: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Last Modified: Sunday, 5th May 2019 10:18:14 pm
 * Modified By: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Copyright 2016 - 2019 Socialanimal.com
 */

import io from 'socket.io-client';
const socket = io(process.env.WS_URL);

export default socket;
