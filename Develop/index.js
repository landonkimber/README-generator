// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const dayjs = require('dayjs');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        message: 'Please type in your first name to get started.\nTo exit this application at anytime, please press CTRL + C\nFirst name: ',
        name: 'firstName',
    },
    {
        type: 'input',
        message: '\nPlease type in your last name.\nLast name: ',
        name: 'lastName',
    },
    {
        type: 'input',
        message: `\nWhat is your GitHub username?\nUsername: `,
        name: 'username',
    },
    {
        type: 'input',
        message: '\nWhat is your email address?\nEmail: ',
        name: 'email',
    },
    {
        type: 'input',
        message: '\nWhat will be the title of your README?\nTitle: ',
        name: 'title',
    },
    //BOOLEAN QUESTIONS
    {
        type: 'confirm',
        message: '\nDo you want to include installation instructions?',
        name: 'installationConfirmation',
        default: false,
    },
    {
        type: 'confirm',
        message: '\nDo you want to include a contribution section?',
        name: 'contributionsConfirmation',
        default: false,
    },
    {
        type: 'confirm',
        message: '\nDo you want to include a usage section?',
        name: 'usageConfirmation',
        default: false,
    },
    {
        type: 'confirm',
        message: '\nDo you want to include a features section?',
        name: 'featuresConfirmation',
        default: false,
    },
    // END BOOLEAN QUESTIONS 
    {
        type: 'editor',
        message: '\nPlease provide a description for your project. \n*This question will require opening a text editor. Please type your content within the editor then save and close the file to be prompted with the next question.\n',
        name: 'desc',
    },
    //CHECK OPTIONAL DESCRIPTIONS
    {
        type: 'editor',
        message: '\nPlease provide installation instructions.\n*This question will require opening a text editor. Please type your content within the editor then save and close the file to be prompted with the next question.\n',
        name: 'installationContent',
        when: (answers) => answers.installationConfirmation,
    },
    {
        type: 'editor',
        message: '\nPlease provide credits for the contribution section.\n*This question will require opening a text editor. Please type your content within the editor then save and close the file to be prompted with the next question.\n',
        name: 'contributionsContent',
        when: (answers) => answers.contributionsConfirmation,
    },
    {
        type: 'editor',
        message: '\nPlease provide information for the usage section.\n*This question will require opening a text editor. Please type your content within the editor then save and close the file to be prompted with the next question.\n ',
        name: 'usageContent',
        when: (answers) => answers.usageConfirmation,
    },
    {
        type: 'editor',
        message: '\nPlease any additional information for the features section.\n*This question will require opening a text editor. Please type your content within the editor then save and close the file to be prompted with the next question.\n',
        name: 'featuresContent',
        when: (answers) => answers.featuresConfirmation,
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: [
            'MIT License',
            'GNU General Public License (GPL)',
            'Apache License 2.0',
            'No License',
        ],
    },
]

inquirer.prompt(questions)
    .then((answers) => {
        console.log(answers);
        
        //CREATE STRINGS FOR OPTIONAL SECTIONS
        if (answers.installationConfirmation) {
            installationString = `\n## Installation\n\n${answers.installationContent}\n`;
            installationStringTOC = '\n- [Installation](#installation)';
        } else { installationString = ''; installationStringTOC = '' };

        if (answers.usageConfirmation) {
            usageString = `\n## Usage\n\n${answers.usageContent}\n`;
            usageStringTOC = '\n- [Usage](#usage)';
        } else { usageString = ''; usageStringTOC = '' };

        if (answers.featuresConfirmation) {
            featuresString = `\n## Features\n\n${answers.featuresContent}\n`;
            featuresStringTOC = '\n- [Features](#features)';
        } else { featuresString = ''; featuresStringTOC = '' };

        if (answers.contributionsConfirmation) {
            contributionsString = `\n## Contributions\n\n${answers.contributionsContent}\n`;
            contributionsStringTOC = '\n- [Contributions](#contributions)';
        } else { contributionsString = ''; contributionsStringTOC = '' };

        //CREATE STRING FOR LICENSE 
        let licenseString = '';
        switch (answers.license) {
            case 'MIT License':
                licenseString =
`
## License

MIT License

Copyright (c) ${dayjs().year()} ${answers.firstName} ${answers.lastName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
                break;

            case 'GNU General Public License (GPL)':
                licenseString = 
`
## License

Copyright (C) ${dayjs().year()} ${answers.firstName} ${answers.lastName}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
`
                break;

            case 'Apache License 2.0':
                licenseString = 
`
## License

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

    "License" shall mean the terms and conditions for use, reproduction, and
    distribution as defined by Sections 1 through 9 of this document.

    "Licensor" shall mean the copyright owner or entity authorized by the
    copyright owner that is granting the License.

    "Legal Entity" shall mean the union of the acting entity and all other
    entities that control, are controlled by, or are under common control with
    that entity. For the purposes of this definition, "control" means (i) the
    power, direct or indirect, to cause the direction or management of such
    entity, whether by contract or otherwise, or (ii) ownership of
    fifty percent (50%) or more of the outstanding shares, or (iii) beneficial
    ownership of such entity.

    "You" (or "Your") shall mean an individual or Legal Entity exercising
    permissions granted by this License.

    "Source" form shall mean the preferred form for making modifications,
    including but not limited to software source code, documentation source,
    and configuration files.

    "Object" form shall mean any form resulting from mechanical transformation
    or translation of a Source form, including but not limited to compiled
    object code, generated documentation, and conversions to
    other media types.

    "Work" shall mean the work of authorship, whether in Source or Object
    form, made available under the License, as indicated by a copyright notice
    that is included in or attached to the work (an example is provided in the
    Appendix below).

    "Derivative Works" shall mean any work, whether in Source or Object form,
    that is based on (or derived from) the Work and for which the editorial
    revisions, annotations, elaborations, or other modifications represent,
    as a whole, an original work of authorship. For the purposes of this
    License, Derivative Works shall not include works that remain separable
    from, or merely link (or bind by name) to the interfaces of, the Work and
    Derivative Works thereof.

    "Contribution" shall mean any work of authorship, including the original
    version of the Work and any modifications or additions to that Work or
    Derivative Works thereof, that is intentionally submitted to Licensor for
    inclusion in the Work by the copyright owner or by an individual or
    Legal Entity authorized to submit on behalf of the copyright owner.
    For the purposes of this definition, "submitted" means any form of
    electronic, verbal, or written communication sent to the Licensor or its
    representatives, including but not limited to communication on electronic
    mailing lists, source code control systems, and issue tracking systems
    that are managed by, or on behalf of, the Licensor for the purpose of
    discussing and improving the Work, but excluding communication that is
    conspicuously marked or otherwise designated in writing by the copyright
    owner as "Not a Contribution."

    "Contributor" shall mean Licensor and any individual or Legal Entity on
    behalf of whom a Contribution has been received by Licensor and
    subsequently incorporated within the Work.

2. Grant of Copyright License.

    Subject to the terms and conditions of this License, each Contributor
    hereby grants to You a perpetual, worldwide, non-exclusive, no-charge,
    royalty-free, irrevocable copyright license to reproduce, prepare
    Derivative Works of, publicly display, publicly perform, sublicense,
    and distribute the Work and such Derivative Works in
    Source or Object form.

3. Grant of Patent License.

    Subject to the terms and conditions of this License, each Contributor
    hereby grants to You a perpetual, worldwide, non-exclusive, no-charge,
    royalty-free, irrevocable (except as stated in this section) patent
    license to make, have made, use, offer to sell, sell, import, and
    otherwise transfer the Work, where such license applies only to those
    patent claims licensable by such Contributor that are necessarily
    infringed by their Contribution(s) alone or by combination of their
    Contribution(s) with the Work to which such Contribution(s) was submitted.
    If You institute patent litigation against any entity (including a
    cross-claim or counterclaim in a lawsuit) alleging that the Work or a
    Contribution incorporated within the Work constitutes direct or
    contributory patent infringement, then any patent licenses granted to
    You under this License for that Work shall terminate as of the date such
    litigation is filed.

4. Redistribution.

    You may reproduce and distribute copies of the Work or Derivative Works
    thereof in any medium, with or without modifications, and in Source or
    Object form, provided that You meet the following conditions:

    1. You must give any other recipients of the Work or Derivative Works a
    copy of this License; and

    2. You must cause any modified files to carry prominent notices stating
    that You changed the files; and

    3. You must retain, in the Source form of any Derivative Works that You
    distribute, all copyright, patent, trademark, and attribution notices from
    the Source form of the Work, excluding those notices that do not pertain
    to any part of the Derivative Works; and

    4. If the Work includes a "NOTICE" text file as part of its distribution,
    then any Derivative Works that You distribute must include a readable copy
    of the attribution notices contained within such NOTICE file, excluding
    those notices that do not pertain to any part of the Derivative Works,
    in at least one of the following places: within a NOTICE text file
    distributed as part of the Derivative Works; within the Source form or
    documentation, if provided along with the Derivative Works; or, within a
    display generated by the Derivative Works, if and wherever such
    third-party notices normally appear. The contents of the NOTICE file are
    for informational purposes only and do not modify the License.
    You may add Your own attribution notices within Derivative Works that You
    distribute, alongside or as an addendum to the NOTICE text from the Work,
    provided that such additional attribution notices cannot be construed
    as modifying the License.

    You may add Your own copyright statement to Your modifications and may
    provide additional or different license terms and conditions for use,
    reproduction, or distribution of Your modifications, or for any such
    Derivative Works as a whole, provided Your use, reproduction, and
    distribution of the Work otherwise complies with the conditions
    stated in this License.

5. Submission of Contributions.

    Unless You explicitly state otherwise, any Contribution intentionally
    submitted for inclusion in the Work by You to the Licensor shall be under
    the terms and conditions of this License, without any additional
    terms or conditions. Notwithstanding the above, nothing herein shall
    supersede or modify the terms of any separate license agreement you may
    have executed with Licensor regarding such Contributions.

6. Trademarks.

    This License does not grant permission to use the trade names, trademarks,
    service marks, or product names of the Licensor, except as required for
    reasonable and customary use in describing the origin of the Work and
    reproducing the content of the NOTICE file.

7. Disclaimer of Warranty.

    Unless required by applicable law or agreed to in writing, Licensor
    provides the Work (and each Contributor provides its Contributions)
    on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
    either express or implied, including, without limitation, any warranties
    or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS
    FOR A PARTICULAR PURPOSE. You are solely responsible for determining the
    appropriateness of using or redistributing the Work and assume any risks
    associated with Your exercise of permissions under this License.

8. Limitation of Liability.

    In no event and under no legal theory, whether in tort
    (including negligence), contract, or otherwise, unless required by
    applicable law (such as deliberate and grossly negligent acts) or agreed
    to in writing, shall any Contributor be liable to You for damages,
    including any direct, indirect, special, incidental, or consequential
    damages of any character arising as a result of this License or out of
    the use or inability to use the Work (including but not limited to damages
    for loss of goodwill, work stoppage, computer failure or malfunction,
    or any and all other commercial damages or losses), even if such
    Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability.

    While redistributing the Work or Derivative Works thereof, You may choose
    to offer, and charge a fee for, acceptance of support, warranty,
    indemnity, or other liability obligations and/or rights consistent with
    this License. However, in accepting such obligations, You may act only
    on Your own behalf and on Your sole responsibility, not on behalf of any
    other Contributor, and only if You agree to indemnify, defend, and hold
    each Contributor harmless for any liability incurred by, or claims
    asserted against, such Contributor by reason of your accepting any such
    warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work

    To apply the Apache License to your work, attach the following boilerplate
    notice, with the fields enclosed by brackets "[]" replaced with your own
    identifying information. (Don't include the brackets!) The text should be
    enclosed in the appropriate comment syntax for the file format. We also
    recommend that a file or class name and description of purpose be included
    on the same "printed page" as the copyright notice for easier
    identification within third-party archives.

        Copyright ${dayjs().year()} ${answers.firstName} ${answers.lastName}

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
        or implied. See the License for the specific language governing
        permissions and limitations under the License.
`
                break;

            case 'Unlicense':
                ''
                break;

            default:
                licenseString = '';
                break;
        }
        let licenseStringTOC = '\n- [License](#license)';
        if (answers.license = 'No License') {
            licenseStringTOC = '';
        }

        const content =
`
# ${answers.title}

## Description

${answers.desc}

## Table of Contents
         
- [Project Title](#project-title)
- [Description](#description)
- [Table of Contents](#table-of-contents)${installationStringTOC}${usageStringTOC}${featuresStringTOC}${contributionsStringTOC}${licenseStringTOC}
- [Contact](#contact)
${installationString}${usageString}${featuresString}${contributionsString}${licenseString}
## Contact
Created by ${answers.firstName} ${answers.lastName}
Email: ${answers.email}
Github Profile: https://github.com/${answers.username}
`
        //WRITE FILE
        fs.writeFile('README.md', content, 'utf8', (err) => {
            if (err) {
                console.error(`Error while writing file: `, err);
            } else {
                console.log(`README.md has been successfully written.`);
            }
        });
    })
    .catch((error) => console.error(error));
