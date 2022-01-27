import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleSpecialCharacters, RuleSpecialCharsFailCode } from './SpecialCharacters'

describe('Password with at least zero (0) special characters', () => {
  const rule = passRuleSpecialCharacters(0)

  it('password', () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it('p@ssword', () => expect(rule('p@ssword').status).toBe(RuleResultStatus.PASS))
  it('p@ssw_rd', () => expect(rule('p@ssw_rd').status).toBe(RuleResultStatus.PASS))
  it('p@s&w_rd', () => expect(rule('p@s&w_rd').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least one (1) special character (using default)', () => {
  const rule = passRuleSpecialCharacters()

  it('password', () => testInsufficientSpecialCharsFail(rule('password'), 1, 0))
  it('p@ssword', () => expect(rule('p@ssword').status).toBe(RuleResultStatus.PASS))
  it('p@ssw_rd', () => expect(rule('p@ssw_rd').status).toBe(RuleResultStatus.PASS))
  it('p@s&w_rd', () => expect(rule('p@s&w_rd').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least two (2) special characters', () => {
  const rule = passRuleSpecialCharacters(2)

  it('password', () => testInsufficientSpecialCharsFail(rule('password'), 2, 0))
  it('p@ssword', () => testInsufficientSpecialCharsFail(rule('p@ssword'), 2, 1))
  it('p@ssw_rd', () => expect(rule('p@ssw_rd').status).toBe(RuleResultStatus.PASS))
  it('p@s&w_rd', () => expect(rule('p@s&w_rd').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least one (1) special character, and a custom character set', () => {
  const rule = passRuleSpecialCharacters(1, '&_')

  it('password', () => testInsufficientSpecialCharsFail(rule('password'), 1, 0))
  it('p@ssword', () => testInsufficientSpecialCharsFail(rule('p@ssword'), 1, 0))
  it('p@ssw_rd', () => expect(rule('p@ssw_rd').status).toBe(RuleResultStatus.PASS))
  it('p@s&w_rd', () => expect(rule('p@s&w_rd').status).toBe(RuleResultStatus.PASS))
})

function testInsufficientSpecialCharsFail(
  ruleResult: HofReturnType<typeof passRuleSpecialCharacters>,
  expectedThreshold: number,
  expectedFound: number
) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleSpecialCharsFailCode.INSUFFICIENT_SPECIAL_CHARS)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
