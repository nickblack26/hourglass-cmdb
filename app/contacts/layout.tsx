import React from 'react';

const Layout = ({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) => {
	return (
		<>
			<div>{children}</div>

			<div>{modal}</div>
		</>
	);
};

export default Layout;
