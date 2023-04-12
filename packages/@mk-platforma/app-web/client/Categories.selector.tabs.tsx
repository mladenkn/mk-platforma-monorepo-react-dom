import { Tabs, Tab, useTheme, TabProps, Popover, IconButton, SxProps } from "@mui/material"
import Link from "next/link"
import type { Post_category_labelType } from "../prisma/generated/zod"
import { getCategoryLabel, CategoryIcon, allCategories } from "./Categories.common"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import React, { useState, MouseEvent, ReactNode, ComponentProps } from "react"

type Post_list_section_categories_tabs_props = {
  sx?: SxProps
  activeTab?: Post_category_labelType
}

export default function Categories_selector_tabs({
  sx,
  activeTab,
}: Post_list_section_categories_tabs_props) {
  const [additionalTabsShownAnchorEl, setAdditionalTabsShownAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  function handle_showMoreTabs(event: MouseEvent<HTMLButtonElement>) {
    setAdditionalTabsShownAnchorEl(event.currentTarget)
  }

  const { palette } = useTheme()

  return (
    <>
      <Categories_tabs sx={sx} activeTab={activeTab} options={allCategories.slice(0, 3)}>
        <IconButton onClick={handle_showMoreTabs}>
          <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Categories_tabs>
      <Popover
        open={!!additionalTabsShownAnchorEl}
        anchorEl={additionalTabsShownAnchorEl}
        onClose={() => setAdditionalTabsShownAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            left: "unset !important",
            right: 0,
          },
        }}
      >
        <Categories_tabs
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: palette.primary.main,
          }}
          activeTab={activeTab}
          orientation="vertical"
          options={allCategories.slice(3)}
        />
      </Popover>
    </>
  )
}

type Categories_tabs_props = ComponentProps<typeof Tabs> & {
  activeTab?: Post_category_labelType
  options: Post_category_labelType[]
  children?: ReactNode
  tabProps?: Partial<ComponentProps<typeof Tab>>
}

function Categories_tabs({
  activeTab,
  children,
  options,
  sx,
  tabProps,
  ...otherProps
}: Categories_tabs_props) {
  const theme = useTheme()

  return (
    <Tabs
      sx={{
        px: 1,
        ".MuiTabs-indicator": {
          background: "white",
          height: 3,
        },
        ".Mui-selected": {
          color: "white !important",
        },
        ...sx,
      }}
      value={activeTab}
      centered
      variant="fullWidth"
      {...otherProps}
    >
      {options.map(tab => (
        <LinkTab
          key={tab}
          sx={{
            textTransform: "none",
            fontSize: theme.typography.h6,
            color: "white",
            ".Mui-selected": {
              color: "white !important",
            },
            fontWeight: 400,
          }}
          label={getCategoryLabel(tab)}
          value={tab}
          icon={<CategoryIcon name={tab} />}
          linkProps={{
            href: {
              query: { category: tab },
            },
          }}
          {...tabProps}
        />
      ))}
      {children}
    </Tabs>
  )
}

function LinkTab(props: TabProps & { linkProps: ComponentProps<typeof Link> }) {
  return <Tab component={linkProps => <Link {...linkProps} {...props.linkProps} />} {...props} />
}
