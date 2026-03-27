export interface PackageData {
  /** Package name as in npm, for example, `mantine-chat-components` */
  packageName: string;

  /** Description of the package, displayed below the title in documentation */
  packageDescription: string;

  /** Link to the documentation mdx file, used in "Edit this page button" */
  mdxFileUrl: string;

  /** Link to the repository on GitHub, used in header github icon and in "View source code button" */
  repositoryUrl: string;

  /** Link to the license file */
  licenseUrl?: string;

  /** Information about the author of the package */
  author: {
    /** Package author name, for example, `John Doe` */
    name: string;

    /** Author GitHub username, for example, `pradip-v2` */
    githubUsername: string;
  };
}

export const PACKAGE_DATA: PackageData = {
  packageName: 'mantine-chat-components',
  packageDescription:
    'Chat UI primitives for React: layout, scrollable messages, bubbles, and composer — built on Mantine',
  mdxFileUrl: 'https://github.com/pradip-v2/mantine-chat-components/blob/master/docs/docs.mdx',
  repositoryUrl: 'https://github.com/pradip-v2/mantine-chat-components',
  licenseUrl: 'https://github.com/pradip-v2/mantine-chat-components/blob/master/LICENSE',
  author: {
    name: 'Pradip Bankar',
    githubUsername: 'pradip-v2',
  },
};
