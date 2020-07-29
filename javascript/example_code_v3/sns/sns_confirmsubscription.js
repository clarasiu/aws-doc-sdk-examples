/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS SDK for JavaScript,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/sns-examples-sending-sms.html.

Purpose:
sns_confirmsubscription.js demonstrates how to verify an endpoint owner's intent to receive messages by validating the token sent to the endpoint by an earlier Subscribe action.
If the token is valid, the action creates a new subscription and returns its Amazon Resource Name (ARN). This call requires an AWS signature only when the AuthenticateOnUnsubscribe flag is set to "true".
For more informaiton on subscription confirmations, see https://docs.aws.amazon.com/sns/latest/api/API_ConfirmSubscription.html.

Inputs (replace in code):
- TOKEN: token sent an endpoint during subscribe action. For example, for an email endpoint, the Token is in the URL of the Confirm Subscription page sent by email. For instance 'abc123' is the token in the URL
https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:xxxxx:my-aws-topic&Token=abc123&Endpoint=address@email.com
- TOPIC_ARN:
- AuthenticateOnUnsubscribe: either 'TRUE' or 'FALSE'


Running the code:
node sns_setsmstype.js
=@
*/

// snippet-start:[sns.JavaScript.subscriptions.confirmSubscriptionV3]

// Import required AWS SDK clients and commands for Node.js
const { SNS, ConfirmSubscriptionCommand } = require("@aws-sdk/client-sns");

// Set the AWS Region
const REGION = "REGION"; //e.g. "us-east-1"


const params = {
    Token: 'TOKEN', // Required. Token sent to the endpoint by an earlier Subscribe action. */
    TopicArn: 'TOPIC_ARN', // Required
    AuthenticateOnUnsubscribe: 'TRUE' // TRUE or FALSE
};

// Create SNS service object
const sns = new SNS(REGION);

const run = async () => {
    try {
        const data = await sns.send(new ConfirmSubscriptionCommand(params));
        console.log("Success", data);
    } catch (err) {
        console.error(err, err.stack);
    }
};
run();
// snippet-end:[sns.JavaScript.subscriptions.confirmSubscriptionV3]
//for unit tests only
exports.run = run();