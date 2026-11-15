# 10-minute expert review

给老师/推广人员看的不是整套代码，也不是 UI 审美，而是 **4 个农业假设 + 1 个可执行性**。

如果对方是农业老师/推广人员，重点问农学；如果是产品/软件老师，重点问“第一次用能不能看懂、会不会信”，不要把它说成农学验证。

## 给对方看什么

打开直播页：https://xxyouka.github.io/next-crop/

只走一条线，不要展示全部功能：

1. **一句话问题**：水稻收完后，下一茬冬天作物能不能在下次插秧前排进去？
2. **Kaiping 默认场景**：看田块和生长阶段，指出 2023/24 的 39.34 mm 雨天窗口。
3. **Try a wet harvest**：同一个冬季马铃薯作业日，2023/24 是 39.34 mm；换到 2024/25 是 0.59 mm。
4. **Find a safer window**：点一下，出现“收割提前 1 天 → 22.89 mm，三季全通过”；问这个调整在现实里是否可执行。
5. 最后打开 **Method and limits** 或 one-page brief，让对方看到 30 mm 是演示阈值、天气是区域格点、田况由用户输入。

## 问这 5 个问题

1. 这个“水稻后茬口”决策，在您熟悉的地区是真实问题吗？哪个环节最不真实？
2. 作物日历、生育期和整地缓冲，哪一项最需要改？
3. 只看作业日前后 3 天降雨够不够？还应该看土壤水分、排水、低温、劳力还是市场？
4. 把收割/插秧提前 1 天，在现实中可行吗？会受到哪些限制？
5. 如果只能保留一个输出，您会保留表格、三季对照，还是“更稳窗口”？为什么？

追问一句：**“您会用它吗？需要补什么才会信？”**

## 记录什么

- 对方角色/地区（征得同意后写姓名；不愿意就写“agronomy instructor, name withheld”）
- 3 句原话/转述
- 1 个具体修改建议
- 1 个“会用 / 可能用 / 不会用”的判断

不要写“field-tested”或“farmer validated”。如果只是老师桌面评审，写 **expert review / desk review**。

## 怎么放进提交物

在 Detailed Description 末尾加 2–3 句英文，例如：

> An agronomy instructor reviewed the decision model on 15 November 2026. They confirmed that the harvest-to-transplant window is the right first decision, and flagged soil moisture and drainage as the next data gap. The 30 mm threshold remains illustrative.

Deck 第 6 页或 one-page brief 的 Validation 处加一句即可；如果只有 10 分钟，优先保证提交，不要为改 PDF 卡住。

## 邀请话术

> 老师您好，想请您用 10 分钟帮我看一个水稻后茬决策工具。不是评 UI/代码，只想核对几个农业假设：作物日历、3 天降雨窗口，以及“收割提前一天”在现实中是否可行。您看 Kaiping 一个场景就够了。

如果对方不是农学背景，把问题换成：

1. 你第一次看，知不知道该先点哪里？
2. 你信 39.34 → 22.89 这个对比吗？为什么？
3. 哪个数字/标签最让你犹豫？
