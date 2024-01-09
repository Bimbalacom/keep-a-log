function generateChangelog() {
    const version = document.getElementById('version').value;
    const date = document.getElementById('date').value;
    const added = document.querySelector('.added-items').value.trim();
    const fixed = document.querySelector('.fixed-items').value.trim();
    const changed = document.querySelector('.changed-items').value.trim();
    const removed = document.querySelector('.removed-items').value.trim();

    if (!validateVersion(version)) {
        alert('Please enter a valid version in the format of number.number.number (e.g., 1.0.0)');
        return;
    }

    let changelog = date ? `## [${version}] - ${date}\n\n` : `## [${version}]\n\n`;
    changelog += formatSection(added, 'Added');
    changelog += formatSection(fixed, 'Fixed');
    changelog += formatSection(changed, 'Changed');
    changelog += formatSection(removed, 'Removed');

    document.getElementById('generatedChangelog').value = changelog.trim();
}

function validateVersion(version) {
    const versionRegex = /^\d+\.\d+\.\d+$/;
    return versionRegex.test(version);
}

function formatSection(sectionText, sectionTitle) {
    if (sectionText.trim() !== '') {
        const lines = sectionText.split('\n');
        const formattedLines = lines.map(line => `- ${line}`).join('\n');
        return `### ${sectionTitle}\n${formattedLines}\n\n`;
    }

    return '';

}

function addTodayDate() {
    const dateInput = document.getElementById('date');
    dateInput.valueAsDate = new Date();
}

function copyChangelog() {
    const generatedChangelog = document.getElementById('generatedChangelog');

    // Select the text in the textarea
    generatedChangelog.select();
    generatedChangelog.setSelectionRange(0, 99999); // For mobile devices

    // Deselect the text
    window.getSelection().removeAllRanges();

    navigator.clipboard.writeText(generatedChangelog.value).then(() => {
       alert('Changelog copied to clipboard!');
    }, (err) => {
        console.error('Could not copy changelog: ', err);
    });
}
