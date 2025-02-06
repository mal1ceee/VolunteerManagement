package utils

func ValidateLimit(limit int) int {
	if limit <= 0 {
		return 10 // default limit
	}
	if limit > 100 {
		return 100 // max limit
	}
	return limit
}

func ValidateOffset(offset int) int {
	if offset < 0 {
		return 0
	}
	return offset
}
