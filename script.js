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

    let changelog = `## [${version}] - ${date}\n\n`;
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
    if (sectionText !== '') {
        const lines = sectionText.split('\n');
        const formattedLines = lines.map(line => `- ${line}`).join('\n');
        return `### ${sectionTitle}\n${formattedLines}\n\n`;
    }

    return '';

}

function addTodayDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    dateInput.value = today;
}

function copyChangelog() {
    const generatedChangelog = document.getElementById('generatedChangelog');

    // Select the text in the textarea
    generatedChangelog.select();
    generatedChangelog.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text
    document.execCommand('copy');

    // Deselect the text
    window.getSelection().removeAllRanges();
    
    // Alert or notification to indicate successful copy
    alert('Changelog copied to clipboard!');
}
