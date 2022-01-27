export enum RuleResultStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
}

export interface RuleResultPass {
  status: RuleResultStatus.PASS
}
export interface RuleResultFailInfo {
  code: string
  meta?: object
}
export interface RuleResultFail<FailInfo extends RuleResultFailInfo> {
  status: RuleResultStatus.FAIL
  info: FailInfo
}
export type RuleResult<FailInfo extends RuleResultFailInfo> = RuleResultPass | RuleResultFail<FailInfo>

export type RuleGeneratorReturn<FailInfo extends RuleResultFailInfo> = (password: string) => RuleResult<FailInfo>
