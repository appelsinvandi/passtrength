import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleMaxLength, RuleMaxLengthFailCode } from './MaxLength'

describe('Max password length: 8', () => {
  const rule = passRuleMaxLength(8)

  it('should allow 6 character password', () => expect(rule('a'.repeat(6)).status).toBe(RuleResultStatus.PASS))
  it('should allow 8 character password', () => expect(rule('a'.repeat(8)).status).toBe(RuleResultStatus.PASS))
  it('should deny 10 character password', () => testTooLongFail(rule('a'.repeat(10)), 8, 10))
})

function testTooLongFail(
  ruleResult: HofReturnType<typeof passRuleMaxLength>,
  expectedThreshold: number,
  expectedFound: number
) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleMaxLengthFailCode.TOO_LONG)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
