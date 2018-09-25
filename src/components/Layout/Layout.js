import React from 'react';

import Aux from  '../../hoc/Aux';
import clasees from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop </div>
        <main className={clasees.Content}>
            {props.children}
        </main>
    </Aux>
)


export default layout;