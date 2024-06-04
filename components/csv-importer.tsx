'use client';
import { getDocument } from '@/lib/mongodb/read';
import React, { useEffect, useState } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';

// include the widget CSS file whichever way your bundler supports it
import 'react-csv-importer/dist/index.css';

export default function CSVImporter() {
	const [company, setCompany] = useState<Company | undefined>();

	// const test = {}

	useEffect(() => {
		getDocument<Company>('companies').then((data) => setCompany(data ?? undefined));
	}, []);

	return (
		<Importer
			dataHandler={async (rows, { startIndex }) => {
				// required, may be called several times
				// receives a list of parsed objects based on defined fields and user column mapping;
				// (if this callback returns a promise, the widget will wait for it before parsing more data)
				// for (row of rows) {
				// 	await myAppMethod(row);
				// }
				console.log(rows);
			}}
			defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
			restartable={false} // optional, lets user choose to upload another file when import is complete
			onStart={({ file, preview, fields, columnFields }) => {
				// optional, invoked when user has mapped columns and started import
				// prepMyAppForIncomingData();
			}}
			onComplete={({ file, preview, fields, columnFields }) => {
				// optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
				// showMyAppToastNotification();
			}}
			onClose={({ file, preview, fields, columnFields }) => {
				// optional, if this is specified the user will see a "Finish" button after import is done,
				// which will call this when clicked
				// goToMyAppNextPage();
			}}
			skipEmptyLines={() => {}}
			// CSV options passed directly to PapaParse if specified:
			// delimiter={...}
			// newline={...}
			// quoteChar={...}
			// escapeChar={...}
			// comments={...}
			// skipEmptyLines={...}
			// delimitersToGuess={...}
			// chunkSize={...} // defaults to 10000
			// encoding={...} // defaults to utf-8, see FileReader API
		>
			{/* {company && Object.keys(company).map((key) => <ImporterField key={key} name={key} label={key.toLocaleUpperCase()} />)} */}
			<ImporterField
				name='name'
				label='Name'
			/>
			<ImporterField
				name='identifier'
				label='identifier'
			/>
			<ImporterField
				name='addressLine1'
				label='Address Line 1'
			/>
			<ImporterField
				name='addressLine2'
				label='Address Line 2'
			/>
			<ImporterField
				name='city'
				label='City'
			/>
			<ImporterField
				name='state'
				label='State'
			/>
			<ImporterField
				name='zip'
				label='Zip'
			/>
			<ImporterField
				name='phoneNumber'
				label='Phone Number'
			/>
			<ImporterField
				name='faxNumber'
				label='Fax Number'
			/>
			<ImporterField
				name='website'
				label='Website'
			/>
			<ImporterField
				name='id'
				label='ID'
			/>
			<ImporterField
				name='dateAcquired'
				label='Date Acquired'
			/>
		</Importer>
	);
}
