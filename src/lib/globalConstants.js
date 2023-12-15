// global.enableCheckSum = false
// global.enableToken = false
// global.enableEncryption = false
// global.encryptionKey = 'abc5ca6b15cfd47257f43d05361a875a0a2074b4a3ad7782872c2f3b9daee84f'
// global.initializationVector = '35623862346137373532373763363366'
import Images from "./Images"
import Strings from './AppStrings'
export const tcVerson = '1.0'


export const proposal = [
    {
        "id": "1",
        "image": Images.ic_proposals,
        "request": Strings.screens.proposal.new_request,
        'tab_params': 'New Request',
    },
    {
        "id": "2",
        "image": Images.Queried,
        "request": Strings.screens.proposal.queried,
        'tab_params': "queried",
    },
    {
        "id": "3",
        "image": Images.Responded,
        "request": Strings.screens.proposal.responded,
        'tab_params': "responded",
    },
    {
        "id": "4",
        "image": Images.ic_purchase_order,
        "request": Strings.screens.proposal.win,
        'tab_params': "win",
    },
    {
        "id": "5",
        "image": Images.Negotiate,
        "request": Strings.screens.proposal.negotiate,
        'tab_params': "negotiate",
    },

]
export const quotaion = [
    {
        "id": "1",
        "image": Images.ic_proposals,
        "request": Strings.screens.proposal.new_request,
        'tab_params': 'New Request',
    },
    {
        "id": "2",
        "image": Images.Queried,
        "request": Strings.screens.proposal.queried,
        'tab_params': "queried",
    },
    {
        "id": "3",
        "image": Images.Responded,
        "request": Strings.screens.proposal.responded,
        'tab_params': "responded",
    },
    {
        "id": "4",
        "image": Images.ic_purchase_order,
        "request": Strings.screens.proposal.win,
        'tab_params': "win",
    },
    {
        "id": "5",
        "image": Images.Negotiate,
        "request": Strings.screens.proposal.negotiate,
        'tab_params': "negotiate",
    },

]
export const purchase = [
    {
        "id": "1",
        "image": Images.ic_proposals,
        "request": "New Request",
        'tab_params': "new_request",
    },
    {
        "id": "2",
        "image": Images.purchase_pending_plan,
        "request": "Pending Plan",
        'tab_params': "pending_plan",
    },
    {
        "id": "3",
        "image": Images.purchase_delivery_pending,
        "request": "Pending Delivery",
        'tab_params': "pending_delivery",
    },
    {
        "id": "4",
        "image": Images.purchase_Delivered,
        "request": "Delivered",
        'tab_params': "delivered",

},
{
    "id": "5",
    "image": Images.purchase_cencel,
    "request": "Cancelled",
    'tab_params': "cancelled",
},
]