# ME-Shared

## Instructions

To start locally in docker:

```bash
docker-compose up
```

Application will be available on 'http://localhost:3000/

### Running locally without docker
start in this root folder

```bash
cd .\\containers\\backend
npm install     # if running for the first time
npm run dev    # start the backend on localhost
cd ..\\frontend
npm install     # if running for the first time
npm start       # start frontend on localhost
```

Application will automatically open in new window at 'http://localhost:3000/'

To rebuild a image if new packages were installed:

```bash
docker-compose up --build frontend //frontend package change
// or
docker-compose up --build backend //backend package change
```

## Build and deployment instructions

- See `Third Party Services` > `DigitalOcean (Deployment)` under [Handover Documentation](./Handover-Documentation.pdf)

## Contributing

### Coding standards
Code should adhere to the [ECMAScript Language Specification](https://tc39.es/ecma262/)
wherever possible. All code should have docstrings.

### Naming convention

#### Branches

Use hyphens as separators:

`<author>-<branch_name>`

#### Files & directories

Use underscores as separators:

`<file_name>`

### Gitflow workflow
We recommend a Gitflow workflow as detailed here:
https://cis-projects.github.io/project_based_course_notes/topics/github.html

#### Publishing changes
`git push origin main`

#### Git Code Review Policy

- The nominated reviewer should be working in the same section (frontend or backend) as the review requester.
- As part of a code review, reviewer should:
  - Check that branch has been rebased onto _dev_ or all merge conflicts have been resolved.
  - Run the branch on their local environment and check to see it does not introduce breaking changes.
  - Check that the feature works as intended.
  - Leave informative comments where relevant.
  - If necessary, request changes that must be made before approval can be granted.
- Once a review request has been made, reviewer should complete their review within **48 hours**.
- For a critical bug fix, the review should be completed within **24 hours**.

#### Managing conflicts
If your local history has diverged from the central repository, this is the result of changes
made by another person on the same files you've made changes on.
Git will refuse the request with a rather verbose error message:

`error: failed to push some refs to '/path/to/repo.git' hint: Updates were rejected because the tip of your current branch is behind hint: its remote counterpart. Merge the remote changes (e.g. 'git pull') hint: before pushing again. hint: See the 'Note about fast-forwards' in 'git push --help' for details.`

To proceed you need to pull everyone else's updates into your local
repository and resolve the diverging history:
`git pull --rebase origin main`

If you are working on unrelated features, it’s unlikely that the
rebasing process will generate conflicts. But if it does, Git will
pause the rebase at the current commit and output the following message,
along with some relevant instructions:

`CONFLICT (content): Merge conflict in [XXXX]`

Now run a git status to see where the problem is. Conflicted files will
appear in the Unmerged paths section:

`# Unmerged paths: # (use "git reset HEAD ..." to unstage) # (use "git add/rm ..." as appropriate to mark resolution) # # both modified: `

Edit the file(s) to your liking. Once you're happy with the result, you
can stage the file(s) in the usual fashion and let git rebase do the rest:

`git add git rebase --continue`

Git will move on to the next commit and repeat the process for any other
commits that generate conflicts.

If you get to this point and realize and you have no idea what’s going
on, don’t panic. Just execute the following command and you’ll be
right back to where you started:

`git rebase --abort`


## Contributors

### COMP90082 2022 Team
**Boxjelly Team**
- Qunzhi Wang 900884@frankie-adam - University of Melbourne
- Hoang Viet Mai 813361@hmai2139 - University of Melbourne
- Sriram Kumar Rao 1110639@sriram-kalekar - University of Melbourne
- Daniel Coleman 994887@dccol - University of Melbourne
- Takemitsu Yamanaka 757038@aoyaSama - University of Melbourne

**Redback Team**
- Haochu Wang haochuw@student.unimelb.edu.au - University of Melbourne
- Zhaoxiang Ning zhaoxiangn@student.unimelb.edu.au - University of Melbourne

### SWEN90013 2021 Team
**Product Owner, Client Liaison**:

Sam Ross, samr1@student.unimelb.edu.au

**Scrum Master**:

Eric Fan, ericfan898@hotmail.com

**SWEN90013 Development Team**:
- Xin Chen, chxc5@student.unimelb.edu.au
- Tien Hinh, mhinh@student.unimelb.edu.au
- Lewis Law, lewis.law@student.unimelb.edu.au
- Yuyao Ma, yuyaom1@student.unimelb.edu.au
- Scott Sun, sunc4@student.unimelb.edu.au
- Yiran Wei, yiran.wei@student.unimelb.edu.au
- Laurence Ye, yunhaoy1@student.unimelb.edu.au
- Zach Zhu, zizhongz@student.unimelb.edu.au

&nbsp;
